import { useMutation } from '@tanstack/react-query';
import { jobQuestApi } from '@api/job-quest';
import { queryClient } from '@/common/query-client';
import { getJobData, JobData, jobQueryKey } from './job.hook';
import { JobsData, jobsQueryKey } from './jobs.hook';

export function useDeleteJob() {
  const mutation = useMutation({
    mutationFn: (jobId: number) => {
      return jobQuestApi.job.deleteJob(jobId);
    },
    onMutate: async (jobId) => {
      const job = getJobData(jobId);
      if (job) {
        // job detail update
        await queryClient.cancelQueries({ queryKey: jobQueryKey(jobId) });
        queryClient.removeQueries(jobQueryKey(jobId));

        // Job Lists Updates
        const queryKey = jobsQueryKey({ jobListId: job.jobListId });
        await queryClient.cancelQueries({ queryKey });
        queryClient.setQueryData<JobsData>(queryKey, (res) => {
          if (res) {
            let data = res?.data;
            data = data.filter(({ id }) => id !== job.id);
            return { ...res, data };
          }
        });

        return { job };
      }
    },
    onError(_error, _variables, ctx) {
      if (ctx) {
        const { job } = ctx;

        queryClient.setQueryData<JobData>(jobQueryKey(job.id), (res) => {
          if (res) return { data: job };
        });

        queryClient.setQueryData<JobsData>(
          jobsQueryKey({ jobListId: job.id }),
          (res) => {
            if (res) {
              const data = res?.data;
              data.push(job);
              return { ...res, data };
            }
          }
        );
      }
    },
    onSettled: async (_res, _error, _vars, ctx) => {
      if (ctx) {
        const { job } = ctx;

        queryClient.invalidateQueries({
          refetchType: 'all',
          queryKey: jobsQueryKey({
            jobListId: job.jobListId,
          }),
        });

        queryClient.invalidateQueries({
          refetchType: 'all',
          queryKey: jobQueryKey(job.id),
        });
      }
    },
  });
  return mutation;
}
