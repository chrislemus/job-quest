import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@/common/query-client';
import { ApiErrorRes, ApiOkRes } from '@/api/job-quest/types';
import { jobQuestApi } from '@/api/job-quest';
import { JobLogEntity } from '@/api/job-quest/job-log/job-log.entity';
import { useAppDispatch } from '@/app/dashboard/store';
import { enqueueToast } from '@/app/dashboard/toast/toast.slice';
import { jobLogsQueryKey } from './job-logs.hook';

export type DeleteJobLogData = ApiOkRes<JobLogEntity>;
export type DeleteJobLogError = ApiErrorRes;

export function useDeleteJobLog() {
  const dispatch = useAppDispatch();

  const mutation = useMutation<DeleteJobLogData, DeleteJobLogError, number>({
    mutationFn: (jobLogId: number) => {
      return jobQuestApi.jobLog.deleteJobLog(jobLogId);
    },
    onSuccess(res) {
      const jobLogData = res.data;
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
