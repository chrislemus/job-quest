import { jobQuestApi } from '@api/job-quest';
import { JobEntity } from '@api/job-quest/job/job.entity';
import { ApiErrorRes, ApiOkRes } from '@api/job-quest/types';
import { QueryFunction, useQuery, UseQueryResult } from '@tanstack/react-query';
import { jobQueryKey as _jobQueryKey } from '@app/dashboard/job/constants';

export type JobData = ApiOkRes<JobEntity>;
export type JobError = ApiErrorRes;

export const jobQueryKey = _jobQueryKey.detail;
export type JobQueryKey = ReturnType<typeof jobQueryKey>;

export const jobQueryFn: QueryFunction<JobData, JobQueryKey> = (ctx) => {
  const { queryKey } = ctx;
  const [_pk, { jobId }] = queryKey;
  return jobQuestApi.job.findById(jobId);
};

export function useJob(jobId: number): UseQueryResult<JobData, JobError> {
  const query = useQuery<JobData, JobError, JobData, JobQueryKey>({
    queryKey: jobQueryKey(jobId),
    queryFn: jobQueryFn,
  });
  return query;
}
