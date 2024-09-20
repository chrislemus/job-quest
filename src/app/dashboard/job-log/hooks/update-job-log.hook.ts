import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@/shared/query-client';
import { UpdateJobLogDto } from '@/app/dashboard/job/dto';
import { ApiErrorRes } from '@/shared/types';
import { jobLogsQueryKey } from './job-logs.hook';
import { jobLogDataService, JobLogItemDto } from '../services';

export type UpdateJobLogVariables = {
  jobLogId: string;
  data: UpdateJobLogDto;
};

export function useUpdateJobLog() {
  const mutation = useMutation<
    JobLogItemDto,
    ApiErrorRes,
    UpdateJobLogVariables
  >({
    mutationFn: (args) => {
      return jobLogDataService.update(args.jobLogId, args.data);
    },
    onSuccess(newJobLogData) {
      queryClient.invalidateQueries({
        queryKey: jobLogsQueryKey(newJobLogData.jobId),
      });
    },
  });
  return mutation;
}
