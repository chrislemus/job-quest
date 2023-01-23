import { useMutation } from '@tanstack/react-query';
import { jobLogService } from '@app/dashboard/job-log/_services';
import { queryClient } from '@common/query-client';
import { jobLogQueryKeyFactory } from '@app/dashboard/job-log/_factories';
import { UpdateJobLogDto } from '@app/dashboard/job/_dto';
import { ApiErrorRes, ApiOkRes } from '@common/api/job-quest/types';
import { JobLogEntity } from '@app/dashboard/job-log/_entities';

type UpdateJobLogMutationVariables = {
  jobLogId: number;
  data: UpdateJobLogDto;
};

export function useUpdateJobLog() {
  const mutation = useMutation<
    ApiOkRes<JobLogEntity>,
    ApiErrorRes,
    UpdateJobLogMutationVariables
  >({
    mutationFn: (args) => {
      return jobLogService.update(args.jobLogId, args.data);
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
