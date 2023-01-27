import { useMutation } from '@tanstack/react-query';
import { jobService } from '@app/dashboard/job/_services';
import { queryClient } from '@common/query-client';
import { jobQueryKeyFactory } from '@app/dashboard/job/_factories';

export function useDeleteJob() {
  const mutation = useMutation({
    mutationFn: (jobId: number) => {
      return jobService.deleteJob(jobId);
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
