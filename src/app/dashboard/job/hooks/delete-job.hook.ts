import { useMutation } from '@tanstack/react-query';
import { jobKeys } from '@app/dashboard/job/factories';
import { jobQuestApi } from '@api/job-quest';
import { queryClient } from '@/common/query-client';

export function useDeleteJob() {
  const mutation = useMutation({
    mutationFn: (jobId: number) => {
      return jobQuestApi.job.deleteJob(jobId);
    },
    onSuccess(res) {
      // TODO: improve performance
      const newJobData = res.data;

      queryClient.invalidateQueries({
        refetchType: 'all',
        queryKey: jobKeys.detail(newJobData.id),
      });

      queryClient.invalidateQueries({
        refetchType: 'all',
        queryKey: jobKeys.all({
          jobListId: newJobData.jobListId,
        }),
      });
    },
  });
  return mutation;
}
