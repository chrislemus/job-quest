import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@common/query-client';
import { jobLogQueryKeyFactory } from '@app/dashboard/job-log/factories';
import { ApiErrorRes, ApiOkRes } from '@api/job-quest/types';
import { CreateJobLogDto } from '@app/dashboard/job/dto';
import { JobLogEntity } from '@api/job-quest/job-log/job-log.entity';
import { jobQuestApi } from '@api/job-quest';

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
        queryKey: jobLogQueryKeyFactory._base,
      });
      queryClient.invalidateQueries({
        queryKey: jobLogQueryKeyFactory.all(res.data.jobId),
      });
    },
  });
  return mutation;
}
