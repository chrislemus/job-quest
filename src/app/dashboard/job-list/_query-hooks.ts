import { jobQuestApi } from '@api/job-quest';
import { JobListPageRes } from '@api/job-quest/job-list/dto/job-list-page-res.dto';
import { ApiErrorRes } from '@api/job-quest/types';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

/**
 * Get Job Lists query data.
 */
function useJobListQuery(): UseQueryResult<JobListPageRes, ApiErrorRes> {
  const query = useQuery<JobListPageRes, ApiErrorRes>({
    queryKey: ['jobList'],
    queryFn: () => {
      return jobQuestApi.jobList.getAll();
    },
  });

  return query;
}

export { useJobListQuery };
