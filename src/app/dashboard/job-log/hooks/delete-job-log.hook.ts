import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@common/query-client';
import { jobLogQueryKeyFactory } from '@app/dashboard/job-log/factories';
import { ApiErrorRes, ApiOkRes } from '@api/job-quest/types';
import { jobQuestApi } from '@api/job-quest';
import { JobLogEntity } from '@api/job-quest/job-log/job-log.entity';
import { useAppDispatch } from '@app/dashboard/store';
import { enqueueToast } from '@app/dashboard/toast/toast.slice';

export type DeleteJobLogData = ApiOkRes<JobLogEntity>;
export type DeleteJobLogError = ApiErrorRes;

export function useDeleteJobLog() {
  const dispatch = useAppDispatch();

  const mutation = useMutation<DeleteJobLogData, DeleteJobLogError, number>({
    mutationFn: (jobLogId: number) => {
      return jobQuestApi.jobLog.deleteJobLog(jobLogId);
    },
    onSuccess(res) {
      // TODO: improve performance
      const jobLogData = res.data;

      queryClient.invalidateQueries({
        queryKey: jobLogQueryKeyFactory.all(jobLogData.jobId),
      });

      // TODO: add below or leave as if, given stale data time
      // queryClient.invalidateQueries({
      //   queryKey: jobLogQueryKeyFactory.detail(jobLogData.id),
      // });
    },
    onError() {
      dispatch(
        enqueueToast({
          message: 'failed to delete job log',
          type: 'error',
        })
      );
    },
  });
  return mutation;
}
