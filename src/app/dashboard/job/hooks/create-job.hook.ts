import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@/shared/query-client';
import { CreateJobDto } from '@/app/dashboard/job/dto';
import { ApiErrorRes } from '@/api/job-quest/types';
import { jobQuestApi } from '@/api/job-quest';
import { jobQueryKey } from './job.hook';
import { jobsQueryKey } from './jobs.hook';
import { JobDto } from '../services';

export function useCreateJob() {
  const mutation = useMutation<JobDto, ApiErrorRes, CreateJobDto>({
    mutationFn: jobQuestApi.job.createJob,

    onSuccess(res) {
      console.log({ res });
      queryClient.invalidateQueries({
        refetchType: 'all',
        queryKey: jobQueryKey(res.id),
      });
      queryClient.invalidateQueries({
        refetchType: 'all',
        queryKey: jobsQueryKey({ queryParams: { jobListId: res.jobListId } }),
      });
    },
  });
  return mutation;
}
