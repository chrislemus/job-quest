import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@common/query-client';
import { jobKeys } from '@app/dashboard/job/factories';
import { CreateJobDto } from '@app/dashboard/job/dto';
import { ApiErrorRes, ApiOkRes } from '@api/job-quest/types';
import { JobEntity } from '@api/job-quest/job/job.entity';
import { jobQuestApi } from '@api/job-quest';

export function useCreateJob() {
  const mutation = useMutation<ApiOkRes<JobEntity>, ApiErrorRes, CreateJobDto>({
    mutationFn: jobQuestApi.job.createJob,
    onSuccess(res) {
      queryClient.invalidateQueries({
        refetchType: 'all',
        queryKey: jobKeys.detail(res.data.id),
      });
      queryClient.invalidateQueries({
        refetchType: 'all',
        queryKey: jobKeys.all({ jobListId: res.data.jobListId }),
      });
    },
  });
  return mutation;
}
