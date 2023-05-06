import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@common/query-client';
import { ApiErrorRes, ApiOkRes } from '@api/job-quest/types';
import { CreateJobLogDto } from '@app/dashboard/job/dto';
import { JobLogEntity } from '@api/job-quest/job-log/job-log.entity';
import { jobQuestApi } from '@api/job-quest';
import { jobLogsQueryKey } from './job-logs.hook';

export type CreateJobLogData = ApiOkRes<JobLogEntity>;
export type CreateJobLogError = ApiErrorRes;

export function useCreateJobLog() {
  const mutation = useMutation<
    CreateJobLogData,
    CreateJobLogError,
    CreateJobLogDto
  >({
    mutationFn: jobQuestApi.jobLog.create,
    onSuccess(res) {
      queryClient.invalidateQueries({
        queryKey: jobLogsQueryKey(res.data.jobId),
      });
    },
  });
  return mutation;
}
