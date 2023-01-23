import {
  ApiPageRes,
  ApiErrorRes,
  ApiOkRes,
} from '@common/api/job-quest/interface';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { jobLogService } from '@app/dashboard/job-log/_services';
import { JobLogEntity } from '@app/dashboard/job-log/_entities';
import { JobEntity } from './_entities';
import { jobLogQueryKeyFactory, jobQueryKeyFactory } from './_factories';
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
    // TODO: add mutation logic using query client
    // enabled: !deleteJobMutation.isLoading && !deleteJobMutation.isSuccess,
  });
  return query;
}

function useJobLogsQuery(
  jobId: number
): UseQueryResult<ApiPageRes<JobLogEntity>, ApiErrorRes> {
  const query = useQuery<ApiPageRes<JobLogEntity>, ApiErrorRes>({
    queryKey: jobLogQueryKeyFactory.all(jobId),
    queryFn: () => {
      return jobLogService.getAll(jobId);
    },
  });

  return query;
}

export { useJobsQuery, useJobQuery, useJobLogsQuery };
