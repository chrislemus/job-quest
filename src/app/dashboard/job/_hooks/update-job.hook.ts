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
  prevJobData: ApiOkRes<JobEntity>;
  newJobData: ApiOkRes<JobEntity>;
};

type JobListContext = {
  queryKey: ReturnType<typeof jobQueryKeyFactory.all>;
  prevJobList: ApiPageRes<JobEntity>;
  newJobList: ApiPageRes<JobEntity>;
}[];

type MutationVariables = { jobId: number; data: UpdateJobDto };

type MutationContext = {
  updatedJob: UpdatedJobContext;
  filteredJobLists: JobListContext;
};

type MutationOptions = UseMutationOptions<
  ApiOkRes<JobEntity>,
  ApiError,
  MutationVariables,
  MutationContext
>;

const jobDetailMutateOptions: Required<
  Pick<MutationOptions, 'onError' | 'onSettled'>
> & {
  onMutate: (
    variables: MutationVariables
  ) => Promise<MutationContext['updatedJob'] | undefined>;
} = {
  onMutate: async (variables) => {
    const jobId = variables.jobId;
    const updateJob = variables.data;
    const jobDetailQueryKey = jobQueryKeyFactory.detail(jobId);

    // Snapshot the previous value
    let prevJobData: ApiOkRes<JobEntity> | undefined =
      queryClient.getQueryData<ApiOkRes<JobEntity>>(jobDetailQueryKey);

    console.log('prevJobData', prevJobData);
    if (prevJobData) {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({
        queryKey: jobDetailQueryKey,
      });
      const newJobData: ApiOkRes<JobEntity> = {
        ...prevJobData,
        data: { ...prevJobData.data, ...updateJob },
      };

      // Optimistically update to the new value
      queryClient.setQueryData<ApiOkRes<JobEntity>>(
        jobDetailQueryKey,
        newJobData
      );

      // Return a context with the previous and new todo
      return { queryKey: jobDetailQueryKey, prevJobData, newJobData };
    }
  },
  onError: (_err, _variables, context) => {
    if (context) {
      queryClient.setQueryData<ApiOkRes<JobEntity>>(
        context.updatedJob.queryKey,
        context.updatedJob.prevJobData
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

const jobListMutationOptions: Required<
  Pick<MutationOptions, 'onError' | 'onSettled'>
> & {
  onMutate: (
    variables: MutationVariables
  ) => Promise<MutationContext['filteredJobLists']>;
} = {
  onMutate: async (variables) => {
    const filteredJobLists: JobListContext = [];
    const updatedJobList =
      Object.keys(variables.data).length === 1 && variables.data['jobListId'];

    if (updatedJobList) {
      // let prevJobData:  ApiPageRes<JobEntity>['data'][0] = jobData.prevJobData.data;
      let prevJobData: ApiPageRes<JobEntity>['data'][0] | undefined;
      const queryKey = jobQueryKeyFactory.all();
      const queriesData = await queryClient.getQueriesData<
        ApiPageRes<JobEntity>
      >(queryKey);

      queriesData?.forEach((res) => {
        const [_queryKey, queryData] = res;
        if (queryData) {
          queryData.data.forEach((job) => {
            if (job.id === variables.jobId) {
              prevJobData = job;
            }
          });
        }
      });
      if (prevJobData) {
        const newJobData = {
          ...prevJobData,
          jobListId: variables.data.jobListId,
        };

        const jobListsToUpdate = [newJobData.jobListId];
        if (updatedJobList) {
          // make sure to update new list first, to display user changes immediately
          jobListsToUpdate.push(prevJobData.jobListId);
        }

        for (const jobListId of jobListsToUpdate) {
          const queryKey = jobQueryKeyFactory.all({ jobListId });

          await queryClient.cancelQueries({ queryKey: queryKey });

          const prevJobList =
            queryClient.getQueryData<ApiPageRes<JobEntity>>(queryKey);

          if (prevJobList) {
            const listData: JobEntity[] = [];
            for (let i = 0; i < prevJobList.data.length; i++) {
              const job = prevJobList.data[i];
              if (updatedJobList) {
                if (
                  job.id === newJobData.id &&
                  job.jobListId !== prevJobData.jobListId
                ) {
                  listData.push(newJobData);
                }
              } else {
                listData.push(job);
              }
            }

            const newJobList: ApiPageRes<JobEntity> = {
              pageInfo: prevJobList.pageInfo,
              data: listData,
            };

            queryClient.setQueryData<ApiPageRes<JobEntity>>(
              queryKey,
              newJobList
            );

            filteredJobLists.push({
              queryKey: queryKey,
              prevJobList,
              newJobList,
            });
          }
        }
        console.log(filteredJobLists);
      }
    }
    return filteredJobLists;
  },
  onError: (...args) => {
    const [_err, _newTodo, context] = args;

    if (context?.filteredJobLists) {
      context.filteredJobLists.forEach((list) => {
        queryClient.setQueryData<ApiPageRes<JobEntity>>(
          list.queryKey,
          list.prevJobList
        );
      });
    }
  },
  // Always refetch after error or success:
  onSettled: (_data, _error, variables, context) => {
    if (context?.filteredJobLists) {
      context.filteredJobLists.forEach((list) => {
        queryClient.invalidateQueries(list.queryKey);
      });
    }
  },
};

function useUpdateJob() {
  const options: MutationOptions = {
    mutationFn: (vars) => {
      return jobService.updateJob(vars.jobId, vars.data);
    },
    onMutate: async (variables) => {
      const updatedJob = await jobDetailMutateOptions.onMutate(variables);
      if (updatedJob) {
        const filteredJobLists = await jobListMutationOptions.onMutate(
          variables
        );
        console.log('filteredJobLists', filteredJobLists);
        return {
          updatedJob,
          filteredJobLists,
        };
      }
    }, // If the mutation fails, use the context we returned above
    onError: (...args) => {
      jobDetailMutateOptions.onError(...args);
      jobListMutationOptions.onError(...args);
    },
    // Always refetch after error or success:
    onSettled: (...args) => {
      jobDetailMutateOptions.onSettled(...args);
      jobListMutationOptions.onSettled(...args);
    },
  };

  const mutation = useMutation(options);

  return mutation;
}

export { useUpdateJob };
