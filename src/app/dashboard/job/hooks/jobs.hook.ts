import { jobQuestApi } from '@/api/job-quest';
import { GetAllJobsResBodyDto as JobsData } from '@/app/dashboard/job/services/job-data/dto';
import { ApiErrorRes as JobsError } from '@/api/job-quest/types';
import { jobQueryKey } from '@/app/dashboard/job/constants';
import { useEffect } from 'react';
import { useActiveJobList, useJobLists } from '@/app/dashboard/job-list/hooks';
import { queryClient } from '@/shared/query-client';
import { useQuery, UseQueryResult, QueryFunction } from '@tanstack/react-query';

export { JobsData, type JobsError };

export type JobsFilters = Parameters<typeof jobQuestApi.job.getAll>[0];

export const jobsQueryKey = jobQueryKey.all;
export type JobsQueryKey = ReturnType<typeof jobsQueryKey>;

export const jobsQueryFn: QueryFunction<JobsData, JobsQueryKey> = async (
  ctx
) => {
  const { queryKey } = ctx;
  const [_pk, { queryParams }] = queryKey;
  const res = await jobQuestApi.job.getAll({ queryParams });
  return res;
};

export function useJobs(
  filters?: JobsFilters,
  config?: {
    enabled?: boolean;
  }
): UseQueryResult<JobsData, JobsError> {
  const query = useQuery<JobsData, JobsError, JobsData, JobsQueryKey>({
    queryKey: jobsQueryKey(filters),
    queryFn: jobsQueryFn,
    enabled: config?.enabled,
  });

  // eventually all jobs will be displayed in same page.
  // but for now we'll just prefetch other content to optimize UX
  const [activeJobList] = useActiveJobList();
  const JobsListQuery = useJobLists();
  const jobLists = JobsListQuery.data?.items || [];
  const mainQueryComplete = query.isFetched;
  useEffect(() => {
    if (activeJobList !== null && jobLists && mainQueryComplete) {
      const prefetchList = jobLists.filter((list) => list.id !== activeJobList);
      Promise.all(
        prefetchList.map((list) => {
          return queryClient.prefetchQuery({
            queryKey: jobsQueryKey({ queryParams: { jobListId: list.id } }),
            queryFn: jobsQueryFn,
          });
        })
      );
    }
  }, [activeJobList, jobLists, mainQueryComplete]);

  return query;
}
