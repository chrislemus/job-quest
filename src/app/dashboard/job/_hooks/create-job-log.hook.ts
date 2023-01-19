import { useMutation } from '@tanstack/react-query';
import { jobLogService } from '@app/dashboard/job/_services';
import { queryClient } from '@common/query-client';
import { jobLogQueryKeyFactory } from '@app/dashboard/job/_factories';

export function useCreateJobLog() {
  const mutation = useMutation({
    mutationFn: jobLogService.create,
    onSuccess(res) {
      queryClient.invalidateQueries({
        queryKey: jobLogQueryKeyFactory._base,
      });
      queryClient.invalidateQueries({
        queryKey: jobLogQueryKeyFactory.all(res.data.jobId),
      });
    },
  });
  return mutation;
}
