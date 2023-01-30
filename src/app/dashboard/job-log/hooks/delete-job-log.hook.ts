import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@common/query-client';
import { jobLogQueryKeyFactory } from '@app/dashboard/job-log/factories';
import { ApiErrorRes, ApiOkRes } from '@api/job-quest/types';
import { jobQuestApi } from '@api/job-quest';
import { JobLogEntity } from '@api/job-quest/job-log/job-log.entity';

export type DeleteJobLogData = ApiOkRes<JobLogEntity>;
export type DeleteJobLogError = ApiErrorRes;

export function useDeleteJobLog() {
  const mutation = useMutation<DeleteJobLogData, DeleteJobLogError, number>({
    mutationFn: (jobLogId: number) => {
      return jobQuestApi.jobLog.deleteJobLog(jobLogId);
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
