import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@/shared/query-client';
import { UpdateJobLogDto } from '@/app/dashboard/job/dto';
import { ApiErrorRes } from '@/api/job-quest/types';
import { jobQuestApi } from '@/api/job-quest';
import { jobLogsQueryKey } from './job-logs.hook';
import { JobLogItemDto } from '../services';

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
