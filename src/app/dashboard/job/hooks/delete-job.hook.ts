import { useMutation } from '@tanstack/react-query';
import { jobQuestApi } from '@/api/job-quest';
import { queryClient } from '@/shared/query-client';
import { getJobData, JobData, jobQueryKey } from './job.hook';
import { JobsData, jobsQueryKey } from './jobs.hook';

export function useDeleteJob() {
  const mutation = useMutation({
    mutationFn: (jobId: string) => {
      return jobQuestApi.job.deleteJob(jobId);
    },
    onMutate: async (jobId) => {
      const job = getJobData(jobId);
      if (job) {
        // job detail update
        await queryClient.cancelQueries({ queryKey: jobQueryKey(jobId) });
        queryClient.removeQueries({ queryKey: jobQueryKey(jobId) });

        // Job Lists Updates
        const queryKey = jobsQueryKey({
          queryParams: { jobListId: job.jobListId },
        });
        await queryClient.cancelQueries({ queryKey });
        queryClient.setQueryData<JobsData>(queryKey, (res) => {
          if (res) {
            let data = res?.items;
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

        queryClient.setQueryData<JobData>(jobQueryKey(job.id), (job) => job);

        queryClient.setQueryData<JobsData>(
          jobsQueryKey({ queryParams: { jobListId: job.id } }),
          (res) => {
            if (res) {
              const data = res?.items;
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
            queryParams: {
              jobListId: job.jobListId,
            },
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
