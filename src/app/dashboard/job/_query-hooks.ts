import {
  ApiPageRes,
  ApiErrorRes,
  ApiOkRes,
} from '@common/api/job-quest/interface';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { jobQueryKeyFactory } from './factories';
import { JobEntity } from './_entities';
import { jobService } from './_services';

/**
 * Get data for multiple jobs.
 */
function useJobsQuery(
  filters?: Parameters<typeof jobService.getAll>[0]
): UseQueryResult<ApiPageRes<JobEntity>, ApiErrorRes> {
  const query = useQuery<ApiPageRes<JobEntity>, ApiErrorRes>({
    queryKey: jobQueryKeyFactory.all(filters),
    queryFn: () => {
      return jobService.getAll(filters);
    },
  });

  return query;
}

/**
 * Get Job data by ID.
 */
function useJobQuery(
  jobId: number
): UseQueryResult<ApiOkRes<JobEntity>, ApiErrorRes> {
  const query = useQuery<ApiOkRes<JobEntity>, ApiErrorRes>({
    queryKey: jobQueryKeyFactory.detail(jobId),
    queryFn: () => jobService.findById(jobId),
  });
  return query;
}

export { useJobsQuery, useJobQuery };
