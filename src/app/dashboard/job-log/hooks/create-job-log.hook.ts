import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@/shared/query-client';
import { ApiErrorRes } from '@/api/job-quest/types';
import { JobLogItemDto } from '@/app/dashboard/job-log/services/job-log-data/dto/job-log.dto';
import { jobQuestApi } from '@/api/job-quest';
import { jobLogsQueryKey } from './job-logs.hook';
import { CreateJobLogDto } from '../services';

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
