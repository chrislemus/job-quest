import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@/shared/query-client';
import { ApiErrorRes } from '@/shared/types';
import { JobLogItemDto } from '@/app/dashboard/job-log/services/job-log-data/dto/job-log.dto';
import { useAppDispatch } from '@/app/dashboard/store';
import { enqueueToast } from '@/app/dashboard/toast/toast.slice';
import { jobLogsQueryKey } from './job-logs.hook';
import { jobLogDataService } from '../services';

export type DeleteJobLogVariables = {
  jobLogId: string;
  jobId: string;
};

export function useDeleteJobLog() {
  const dispatch = useAppDispatch();

  const mutation = useMutation<
    Pick<JobLogItemDto, 'id'>,
    ApiErrorRes,
    DeleteJobLogVariables
  >({
    mutationFn: ({ jobLogId, jobId }) => {
      return jobLogDataService.deleteJobLog(jobLogId, jobId);
    },
    onSuccess(_data, { jobId }) {
      queryClient.invalidateQueries({
        queryKey: jobLogsQueryKey(jobId),
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
