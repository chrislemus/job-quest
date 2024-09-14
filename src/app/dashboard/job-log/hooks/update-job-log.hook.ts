import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@/common/query-client';
import { UpdateJobLogDto } from '@/app/dashboard/job/dto';
import { ApiErrorRes } from '@/api/job-quest/types';
import { JobLogEntity } from '@/app/dashboard/job-log/services/job-log-data/job-log.entity';
import { jobQuestApi } from '@/api/job-quest';
import { jobLogsQueryKey } from './job-logs.hook';

export type UpdateJobLogData = JobLogEntity;
export type UpdateJobLogError = ApiErrorRes;
export type UpdateJobLogVariables = {
  jobLogId: string;
  data: UpdateJobLogDto;
};

export function useUpdateJobLog() {
  const mutation = useMutation<
    UpdateJobLogData,
    UpdateJobLogError,
    UpdateJobLogVariables
  >({
    mutationFn: (args) => {
      return jobQuestApi.jobLog.update(args.jobLogId, args.data);
    },
    onSuccess(newJobLogData) {
      queryClient.invalidateQueries({
        queryKey: jobLogsQueryKey(newJobLogData.jobId),
      });
    },
  });
  return mutation;
}
