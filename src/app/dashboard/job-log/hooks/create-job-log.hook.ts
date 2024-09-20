import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@/shared/query-client';
import { ApiErrorRes } from '@/shared/types';
import { JobLogItemDto } from '@/app/dashboard/job-log/services/job-log-data/dto/job-log.dto';
import { jobLogsQueryKey } from './job-logs.hook';
import { CreateJobLogDto, jobLogDataService } from '../services';

export function useCreateJobLog() {
  const mutation = useMutation<JobLogItemDto, ApiErrorRes, CreateJobLogDto>({
    mutationFn: jobLogDataService.create,
    onSuccess(res) {
      queryClient.invalidateQueries({
        queryKey: jobLogsQueryKey(res.jobId),
      });
    },
  });
  return mutation;
}
