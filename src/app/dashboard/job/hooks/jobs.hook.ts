import { jobQuestApi } from '@api/job-quest';
import { JobPageRes } from '@api/job-quest/job/dto';
import { ApiErrorRes } from '@api/job-quest/types';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { jobQueryKeyFactory } from '@app/dashboard/job/factories';

export type JobsData = JobPageRes;
export type JobsError = ApiErrorRes;

export type JobFilters = Parameters<typeof jobQuestApi.job.getAll>[0];

export function useJobs(
  filters?: JobFilters,
  config?: {
    enabled?: boolean;
  }
): UseQueryResult<JobsData, ApiErrorRes> {
  const query = useQuery<JobsData, ApiErrorRes>({
    queryKey: jobQueryKeyFactory.all(filters),
    queryFn: () => {
      return jobQuestApi.job.getAll(filters);
    },
    enabled: config?.enabled,
  });

  return query;
}
