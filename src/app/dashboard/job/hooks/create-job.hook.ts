import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@common/query-client';
import { CreateJobDto } from '@app/dashboard/job/dto';
import { ApiErrorRes, ApiOkRes } from '@api/job-quest/types';
import { JobEntity } from '@api/job-quest/job/job.entity';
import { jobQuestApi } from '@api/job-quest';
import { jobQueryKey } from './job.hook';
import { jobsQueryKey } from './jobs.hook';

export function useCreateJob() {
  const mutation = useMutation<ApiOkRes<JobEntity>, ApiErrorRes, CreateJobDto>({
    mutationFn: jobQuestApi.job.createJob,
    onSuccess(res) {
      queryClient.invalidateQueries({
        refetchType: 'all',
        queryKey: jobQueryKey(res.data.id),
      });
      queryClient.invalidateQueries({
        refetchType: 'all',
        queryKey: jobsQueryKey({ jobListId: res.data.jobListId }),
      });
    },
  });
  return mutation;
}
