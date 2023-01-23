import { useMutation } from '@tanstack/react-query';
import { jobLogService } from '@app/dashboard/job-log/_services';
import { queryClient } from '@common/query-client';
import { jobLogQueryKeyFactory } from '@app/dashboard/job/_factories';
import { ApiErrorRes, ApiOkRes } from '@common/api/job-quest/types';
import { JobLogEntity } from '@app/dashboard/job-log/_entities';
import { CreateJobLogDto } from '@app/dashboard/job/_dto';

export function useCreateJobLog() {
  const mutation = useMutation<
    ApiOkRes<JobLogEntity>,
    ApiErrorRes,
    CreateJobLogDto
  >({
    mutationFn: jobLogService.create,
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
