import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@common/query-client';
import { UpdateJobDto } from '@app/dashboard/job/dto';
import { ApiErrorRes, ApiOkRes } from '@api/job-quest/types';
import { JobEntity } from '@api/job-quest/job/job.entity';
import { jobQuestApi } from '@api/job-quest';
import { jobQueryKey } from './job.hook';
import { JobsData, jobsQueryKey } from './jobs.hook';

type Data = ApiOkRes<JobEntity>;
type Error = ApiErrorRes;
type Variables = { jobId: number; data: UpdateJobDto };
type Context = { prevJob?: JobEntity };

export function useUpdateJob() {
  const mutation = useMutation<Data, Error, Variables, Context>({
    mutationFn: (vars) => {
      return jobQuestApi.job.updateJob(vars.jobId, vars.data);
    },
    onMutate: ({ jobId }) => {
      const all = queryClient.getQueriesData<JobsData>(jobsQueryKey());
      for (const [_queryKey, data] of all) {
        if (data) {
          for (const job of data.data) {
            if (job.id === jobId) return { prevJob: job };
          }
        }
      }
    },
    onSuccess: async (res, _vars, ctx) => {
      const prevJob = ctx?.prevJob;
      const updatedJob = res.data;

      const invalidateByFilteredList = (jobListId: number) => {
        queryClient.invalidateQueries({
          refetchType: 'all',
          queryKey: jobsQueryKey({ jobListId }),
        });
      };

      invalidateByFilteredList(updatedJob.jobListId);

      if (prevJob && updatedJob.jobListId !== prevJob.jobListId) {
        invalidateByFilteredList(prevJob.jobListId);
      }

      queryClient.invalidateQueries({
        refetchType: 'all',
        queryKey: jobQueryKey(updatedJob.id),
      });
    },
  });
  return mutation;
}
