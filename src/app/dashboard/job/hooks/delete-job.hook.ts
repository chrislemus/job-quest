import { useMutation } from '@tanstack/react-query';
import { jobQuestApi } from '@api/job-quest';
import { queryClient } from '@/common/query-client';
import { jobQueryKey } from './job.hook';
import { jobsQueryKey } from './jobs.hook';

export function useDeleteJob() {
  const mutation = useMutation({
    mutationFn: (jobId: number) => {
      return jobQuestApi.job.deleteJob(jobId);
    },
    onSuccess(res) {
      const newJobData = res.data;

      queryClient.invalidateQueries({
        refetchType: 'all',
        queryKey: jobQueryKey(newJobData.id),
      });

      queryClient.invalidateQueries({
        refetchType: 'all',
        queryKey: jobsQueryKey({
          jobListId: newJobData.jobListId,
        }),
      });
    },
  });
  return mutation;
}
