import { useMutation } from '@tanstack/react-query';
import { jobLogService } from '@app/dashboard/job-log/_services';
import { queryClient } from '@common/query-client';
import { jobLogQueryKeyFactory } from '@app/dashboard/job-log/_factories';
import { ApiErrorRes, ApiOkRes } from '@common/api/job-quest/types';
import { JobLogEntity } from '@app/dashboard/job-log/_entities';

export function useDeleteJobLog() {
  const mutation = useMutation<
    ApiOkRes<JobLogEntity>,
    ApiErrorRes,
    number,
    unknown
  >({
    mutationFn: (jobLogId: number) => {
      return jobLogService.deleteJobLog(jobLogId);
    },
    onSuccess(res) {
      // TODO: improve performance
      const jobLogData = res.data;

      queryClient.invalidateQueries({
        queryKey: jobLogQueryKeyFactory.detail(jobLogData.id),
      });

      queryClient.invalidateQueries({
        queryKey: jobLogQueryKeyFactory.all(jobLogData.jobId),
      });
    },
  });
  return mutation;
}
