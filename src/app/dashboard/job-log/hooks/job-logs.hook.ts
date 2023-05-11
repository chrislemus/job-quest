import { jobQuestApi } from '@/api/job-quest';
import { JobLogPageRes as JobLogData } from '@/api/job-quest/job-log/dto';
import { ApiErrorRes as JobLogError } from '@/api/job-quest/types';
import { jobLogQueryKey } from '@/app/dashboard/job-log/constants';
import { QueryFunction, useQuery, UseQueryResult } from '@tanstack/react-query';

export const jobLogsQueryKey = jobLogQueryKey.all;
export type JobLogsQueryKey = ReturnType<typeof jobLogsQueryKey>;

export const jobLogsQueryFn: QueryFunction<JobLogData, JobLogsQueryKey> = (
  ctx
) => {
  const { queryKey } = ctx;
  const [_pk, { jobId }] = queryKey;
  return jobQuestApi.jobLog.getAll(jobId);
};

export function useJobLogs(
  jobId: number
): UseQueryResult<JobLogData, JobLogError> {
  const query = useQuery<JobLogData, JobLogError, JobLogData, JobLogsQueryKey>({
    queryKey: jobLogsQueryKey(jobId),
    queryFn: jobLogsQueryFn,
  });

  return query;
}
