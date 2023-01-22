import { useMutation } from '@tanstack/react-query';
import { jobService } from '@app/dashboard/job/_services';
import { queryClient } from '@common/query-client';
import { jobQueryKeyFactory } from '@app/dashboard/job/_factories';
import { CreateJobDto } from '@app/dashboard/job/_dto';
import { JobEntity } from '@app/dashboard/job/_entities';
import { ApiErrorRes, ApiOkRes } from '@common/api/job-quest/interface';

export function useCreateJob() {
  const mutation = useMutation<ApiOkRes<JobEntity>, ApiErrorRes, CreateJobDto>({
    mutationFn: jobService.createJob,
    onSuccess(res) {
      queryClient.invalidateQueries({
        queryKey: jobQueryKeyFactory.detail(res.data.id),
      });
      queryClient.invalidateQueries({
        queryKey: jobQueryKeyFactory.all({ jobListId: res.data.jobListId }),
      });
    },
  });
  return mutation;
}
