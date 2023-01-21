import { useMutation } from '@tanstack/react-query';
import { jobLogService } from '@app/dashboard/job/_services';
import { queryClient } from '@common/query-client';
import { jobLogQueryKeyFactory } from '@app/dashboard/job/_factories';
import { UpdateJobLogDto } from '@app/dashboard/job/_dto';

export function useUpdateJobLog() {
  const mutation = useMutation({
    mutationFn: (args: { jobLogId: number; data: UpdateJobLogDto }) => {
      return jobLogService.update(args.jobLogId, args.data);
    },
    onSuccess(res) {
      const newJobLogData = res.data;

      queryClient.invalidateQueries({
        queryKey: jobLogQueryKeyFactory.detail(newJobLogData.id),
      });

      // TODO: test all cases for invalidating this update
      queryClient.invalidateQueries({
        queryKey: jobLogQueryKeyFactory.all(newJobLogData.jobId),
      });
    },
  });
  return mutation;
}
