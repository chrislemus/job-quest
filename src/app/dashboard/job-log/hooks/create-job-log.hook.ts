import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@/shared/query-client';
import { ApiErrorRes } from '@/api/job-quest/types';
import { CreateJobLogDto } from '@/app/dashboard/job/dto';
import { JobLogItemDto } from '@/app/dashboard/job-log/services/job-log-data/dto/job-log.dto';
import { jobQuestApi } from '@/api/job-quest';
import { jobLogsQueryKey } from './job-logs.hook';

export function useCreateJobLog() {
  const mutation = useMutation<JobLogItemDto, ApiErrorRes, CreateJobLogDto>({
    mutationFn: jobQuestApi.jobLog.create,
    onSuccess(res) {
      queryClient.invalidateQueries({
        queryKey: jobLogsQueryKey(res.jobId),
      });
    },
  });
  return mutation;
}
