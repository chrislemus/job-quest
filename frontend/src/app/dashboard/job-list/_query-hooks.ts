import { ApiPageRes, ApiErrorRes } from '@common/api/job-quest/types';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { JobListEntity } from './_entities';
import { jobListService } from './_services';

/**
 * Get Job Lists query data.
 */
function useJobListQuery(): UseQueryResult<
  ApiPageRes<JobListEntity>,
  ApiErrorRes
> {
  const query = useQuery<ApiPageRes<JobListEntity>, ApiErrorRes>({
    queryKey: ['jobList'],
    queryFn: () => {
      return jobListService.getAll();
    },
  });

  return query;
}

export { useJobListQuery };
