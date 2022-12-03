import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { UpdateJobDto } from '@app/dashboard/job/_dto';
import { jobService } from '@app/dashboard/job/_services';
import { ApiOkRes, ApiPageRes } from '@common/api/job-quest/interface';
import { JobEntity } from '../_entities';
import { ApiError } from 'next/dist/server/api-utils';
import { jobQueryKeyFactory } from '../factories';
import { queryClient } from '@common/query-client';

type UpdatedJobContext = {
  queryKey: ReturnType<typeof jobQueryKeyFactory.detail>;
  prevJobData: JobEntity;
  newJobData: JobEntity;
};
type JobListContext = {
  queryKey: ReturnType<typeof jobQueryKeyFactory.all>;
  prevJobList: ApiPageRes<JobEntity>;
  newJobList: ApiPageRes<JobEntity>;
};

type MutationVariables = { jobId: number; data: UpdateJobDto };

type MutationContext = {
  updatedJob: UpdatedJobContext;
  filteredJobListCurrent?: JobListContext;
};

type MutationOptionsCustomOnMutate<T extends keyof MutationContext> = Required<
  Pick<MutationOptions, 'onError' | 'onSettled'>
> & {
  onMutate: (
    variables: MutationVariables
  ) => Promise<MutationContext[T] | undefined> | MutationContext[T] | undefined;
};

type MutationOptions = UseMutationOptions<
  ApiOkRes<JobEntity>,
  ApiError,
  MutationVariables,
  MutationContext
>;

const jobDetailMutateOptions: MutationOptionsCustomOnMutate<'updatedJob'> = {
  onMutate: async (variables) => {
    const jobId = variables.jobId;
    const updateJob = variables.data;
    const jobDetailQueryKey = jobQueryKeyFactory.detail(jobId);
    // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
    await queryClient.cancelQueries({
      queryKey: jobDetailQueryKey,
    });

    // Snapshot the previous value
    const prevJobData =
      queryClient.getQueryData<ApiOkRes<JobEntity>>(jobDetailQueryKey)?.data;

    if (prevJobData) {
      const newJobData: JobEntity = { ...prevJobData, ...updateJob };

      // Optimistically update to the new value
      queryClient.setQueryData<ApiOkRes<JobEntity>>(jobDetailQueryKey, {
        data: newJobData,
      });

      // Return a context with the previous and new todo
      return { queryKey: jobDetailQueryKey, prevJobData, newJobData };
    }
  },
  onError: (_err, _variables, context) => {
    if (context) {
      queryClient.setQueryData<ApiOkRes<JobEntity>>(
        context.updatedJob.queryKey,
        { data: context.updatedJob.prevJobData }
      );
    }
  },
  // Always refetch after error or success:
  onSettled: (_data, _error, variables) => {
    queryClient.invalidateQueries({
      queryKey: jobQueryKeyFactory.detail(variables.jobId),
    });
  },
};

async function onMutateJobList(
  jobData: UpdatedJobContext
): Promise<JobListContext | undefined> {
  const filteredJobsQueryKey = jobQueryKeyFactory.all({
    jobListId: jobData.newJobData.jobListId,
  });

  await queryClient.cancelQueries({
    queryKey: filteredJobsQueryKey,
  });
  const prevJobList =
    queryClient.getQueryData<ApiPageRes<JobEntity>>(filteredJobsQueryKey);

  if (prevJobList) {
    const newJobList = {
      pageInfo: prevJobList.pageInfo,
      data: prevJobList.data.map((job) => {
        if (job.id === jobData.newJobData.id) {
          return jobData.newJobData;
        }
        return job;
      }),
    };

    queryClient.setQueryData<ApiPageRes<JobEntity>>(
      filteredJobsQueryKey,
      newJobList
    );

    return {
      queryKey: filteredJobsQueryKey,
      prevJobList,
      newJobList,
    };
  }
}

function useUpdateJob() {
  const options: MutationOptions = {
    mutationFn: (vars) => {
      return jobService.updateJob(vars.jobId, vars.data);
    },
    onMutate: async (variables) => {
      const updatedJob = await jobDetailMutateOptions.onMutate(variables);
      if (updatedJob) {
        return {
          updatedJob,
          filteredJobListCurrent: await onMutateJobList(updatedJob),
        };
      }
    }, // If the mutation fails, use the context we returned above
    onError: (...args) => {
      const [_err, _newTodo, context] = args;
      jobDetailMutateOptions.onError(...args);

      if (context) {
        if (context.filteredJobListCurrent) {
          queryClient.setQueryData<ApiPageRes<JobEntity>>(
            context.filteredJobListCurrent?.queryKey,
            context.filteredJobListCurrent?.prevJobList
          );
        }
      }
    },
    // Always refetch after error or success:
    onSettled: (...args) => {
      const [_data, _error, variables, context] = args;
      jobDetailMutateOptions.onSettled(...args);

      if (context?.updatedJob) {
        const { newJobData } = context?.updatedJob;
        queryClient.invalidateQueries({
          queryKey: jobQueryKeyFactory.all({
            jobListId: context?.updatedJob.newJobData.jobListId,
          }),
        });

        queryClient.invalidateQueries({
          queryKey: jobQueryKeyFactory.all({
            jobListId: newJobData.jobListId,
          }),
        });
      }
    },
  };

  const mutation = useMutation(options);

  return mutation;
}

export { useUpdateJob };
