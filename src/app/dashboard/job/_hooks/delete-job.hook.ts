import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@common/query-client';
import { jobQueryKeyFactory } from '@app/dashboard/job/_factories';
import { jobQuestApi } from '@api/job-quest';

export function useDeleteJob() {
  const mutation = useMutation({
    mutationFn: (jobId: number) => {
      return jobQuestApi.job.deleteJob(jobId);
    },
    onSuccess(res) {
      // TODO: improve performance
      const newJobData = res.data;

      queryClient.invalidateQueries({
        queryKey: jobQueryKeyFactory.detail(newJobData.id),
      });

      queryClient.invalidateQueries({
        queryKey: jobQueryKeyFactory.all({
          jobListId: newJobData.jobListId,
        }),
      });
    },
  });
  return mutation;
}
