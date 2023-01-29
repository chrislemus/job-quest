import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@common/query-client';
import { jobQueryKeyFactory } from '@app/dashboard/job/_factories';
import { CreateJobDto } from '@app/dashboard/job/_dto';
import { ApiErrorRes, ApiOkRes } from '@api/job-quest/types';
import { JobEntity } from '@api/job-quest/job/job.entity';
import { jobQuestApi } from '@api/job-quest';

export function useCreateJob() {
  const mutation = useMutation<ApiOkRes<JobEntity>, ApiErrorRes, CreateJobDto>({
    mutationFn: jobQuestApi.job.createJob,
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
