import { jobQuestApi } from '@api/job-quest';
import { JobPageRes } from '@api/job-quest/job/dto';
import { JobLogPageRes } from '@api/job-quest/job-log/dto';
import { JobEntity } from '@api/job-quest/job/job.entity';
import { ApiErrorRes, ApiOkRes } from '@api/job-quest/types';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { jobLogQueryKeyFactory } from '../job-log/_factories';
import { jobQueryKeyFactory } from './_factories';

/**
 * Get data for multiple jobs.
 */
function useJobsQuery(
  filters?: Parameters<typeof jobQuestApi.job.getAll>[0]
): UseQueryResult<JobPageRes, ApiErrorRes> {
  const query = useQuery<JobPageRes, ApiErrorRes>({
    queryKey: jobQueryKeyFactory.all(filters),
    queryFn: () => {
      return jobQuestApi.job.getAll(filters);
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
    queryFn: () => jobQuestApi.job.findById(jobId),
    // TODO: add mutation logic using query client
    // enabled: !deleteJobMutation.isLoading && !deleteJobMutation.isSuccess,
  });
  return query;
}

function useJobLogsQuery(
  jobId: number
): UseQueryResult<JobLogPageRes, ApiErrorRes> {
  const query = useQuery<JobLogPageRes, ApiErrorRes>({
    queryKey: jobLogQueryKeyFactory.all(jobId),
    queryFn: () => {
      return jobQuestApi.jobLog.getAll(jobId);
    },
  });

  return query;
}

export { useJobsQuery, useJobQuery, useJobLogsQuery };
