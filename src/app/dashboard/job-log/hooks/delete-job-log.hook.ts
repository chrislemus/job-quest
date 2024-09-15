import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@/shared/query-client';
import { ApiErrorRes } from '@/api/job-quest/types';
import { jobQuestApi } from '@/api/job-quest';
import { JobLogItemDto } from '@/app/dashboard/job-log/services/job-log-data/dto/job-log.dto';
import { useAppDispatch } from '@/app/dashboard/store';
import { enqueueToast } from '@/app/dashboard/toast/toast.slice';
import { jobLogsQueryKey } from './job-logs.hook';

export function useDeleteJobLog() {
  const dispatch = useAppDispatch();

  const mutation = useMutation<JobLogItemDto, ApiErrorRes, string>({
    mutationFn: (jobLogId) => {
      return jobQuestApi.jobLog.deleteJobLog(jobLogId);
    },
    onSuccess(jobLogData) {
      queryClient.invalidateQueries({
        queryKey: jobLogsQueryKey(jobLogData.jobId),
      });
    },
    onError() {
      const message = 'failed to delete job log';
      const type = 'error';
      dispatch(enqueueToast({ message, type }));
    },
  });
  return mutation;
}
