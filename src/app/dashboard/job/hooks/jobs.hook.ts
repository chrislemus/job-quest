import { jobQuestApi } from '@api/job-quest';
import { JobPageRes } from '@api/job-quest/job/dto';
import { ApiErrorRes } from '@api/job-quest/types';
import {
  QueryFunctionContext,
  useQuery,
  UseQueryResult,
} from '@tanstack/react-query';
import { jobKeys } from '@app/dashboard/job/factories';
import { useEffect } from 'react';
import { useActiveJobList, useJobLists } from '../../job-list/hooks';
import { queryClient } from '@/common/query-client';

export type JobsData = JobPageRes;
export type JobsError = ApiErrorRes;

export type JobFilters = Parameters<typeof jobQuestApi.job.getAll>[0];

// function queyFn({
//   queryKey,
// }: QueryFunctionContext<ReturnType<(typeof jobKeys)['all']>>) {
//   const { jobListId } = queryKey[0];
//   return jobQuestApi.job.getAll({ jobListId });
// }

export function useJobs(
  filters?: JobFilters,
  config?: {
    enabled?: boolean;
  }
): UseQueryResult<JobsData, ApiErrorRes> {
  const [activeJobList] = useActiveJobList();
  const JobsListQuery = useJobLists();
  const jobLists = JobsListQuery.data?.data || [];

  const query = useQuery<JobsData, ApiErrorRes>({
    queryKey: jobKeys.all(filters),
    queryFn: ({ queryKey }) => {
      queryKey;
      return jobQuestApi.job.getAll(filters);
    },
    enabled: config?.enabled,
  });

  const mainQueryComplete = query.isFetched;
  useEffect(() => {
    if (activeJobList !== null && jobLists && mainQueryComplete) {
      const prefetchList = jobLists.filter((list) => list.id !== activeJobList);
      Promise.all(
        prefetchList.map((list) => {
          const filters = {
            jobListId: list.id,
          };
          return queryClient.prefetchQuery({
            queryKey: jobKeys.all(filters),
            queryFn: () => jobQuestApi.job.getAll(filters),
          });
        })
      );
    }
  }, [activeJobList, jobLists, mainQueryComplete]);

  return query;
}
