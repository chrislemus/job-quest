import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@common/query-client';
import { jobLogQueryKeyFactory } from '@app/dashboard/job-log/factories';
import { UpdateJobLogDto } from '@app/dashboard/job/dto';
import { ApiErrorRes, ApiOkRes } from '@api/job-quest/types';
import { JobLogEntity } from '@api/job-quest/job-log/job-log.entity';
import { jobQuestApi } from '@api/job-quest';

export type UpdateJobLogData = ApiOkRes<JobLogEntity>;
export type UpdateJobLogError = ApiErrorRes;
export type UpdateJobLogVariables = {
  jobLogId: number;
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
    onSuccess(res) {
      const newJobLogData = res.data;

      queryClient.invalidateQueries({
        queryKey: jobLogQueryKeyFactory.detail(newJobLogData.id),
      });

      // TODO: test all cases for invalidating this update
      queryClient.invalidateQueries({
        queryKey: jobLogQueryKeyFactory.all(newJobLogData.jobId),
      });
    },
  });
  return mutation;
}
