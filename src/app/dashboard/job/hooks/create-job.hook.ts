import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@/common/query-client';
import { CreateJobDto } from '@/app/dashboard/job/dto';
import { ApiErrorRes } from '@/api/job-quest/types';
import { JobEntity } from '@/api/job-quest/job/job.entity';
import { jobQuestApi } from '@/api/job-quest';
import { jobQueryKey } from './job.hook';
import { jobsQueryKey } from './jobs.hook';

export function useCreateJob() {
  const mutation = useMutation<JobEntity, ApiErrorRes, CreateJobDto>({
    mutationFn: jobQuestApi.job.createJob,

    onSuccess(res) {
      console.log({ res });
      queryClient.invalidateQueries({
        refetchType: 'all',
        queryKey: jobQueryKey(res.id),
      });
      queryClient.invalidateQueries({
        refetchType: 'all',
        queryKey: jobsQueryKey({ jobListId: res.jobListId }),
      });
    },
  });
  return mutation;
}
