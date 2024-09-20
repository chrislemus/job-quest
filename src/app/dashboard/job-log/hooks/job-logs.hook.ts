import { JobLogPageResBodyDto } from '@/app/dashboard/job-log/services/job-log-data/dto';
import { ApiErrorRes } from '@/shared/types';
import { jobLogQueryKey } from '@/app/dashboard/job-log/constants';
import { QueryFunction, useQuery, UseQueryResult } from '@tanstack/react-query';
import { jobLogDataService } from '../services';

export const jobLogsQueryKey = jobLogQueryKey.all;
export type JobLogsQueryKey = ReturnType<typeof jobLogsQueryKey>;

export const jobLogsQueryFn: QueryFunction<
  JobLogPageResBodyDto,
  JobLogsQueryKey
> = (ctx) => {
  const { queryKey } = ctx;
  const [_pk, { jobId }] = queryKey;
  return jobLogDataService.getAll(jobId);
};

export function useJobLogs(
  jobId: string
): UseQueryResult<JobLogPageResBodyDto, ApiErrorRes> {
  const query = useQuery<
    JobLogPageResBodyDto,
    ApiErrorRes,
    JobLogPageResBodyDto,
    JobLogsQueryKey
  >({
    queryKey: jobLogsQueryKey(jobId),
    queryFn: jobLogsQueryFn,
  });

  return query;
}
