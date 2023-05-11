import { jobQuestApi } from '@/api/job-quest';
import { JobEntity } from '@/api/job-quest/job/job.entity';
import { ApiErrorRes, ApiOkRes } from '@/api/job-quest/types';
import { QueryFunction, useQuery, UseQueryResult } from '@tanstack/react-query';
import { jobQueryKey as _jobQueryKey } from '@/app/dashboard/job/constants';
import { queryClient } from '@/common/query-client';
import { JobsData, jobsQueryKey } from './jobs.hook';

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

/**
 * utility function for extracting job data
 * - job data can be find individually (query by ID)
 * - or in a list (jobs query with filters)
 */
export function getJobData(jobId: number): JobEntity | undefined {
  const job = queryClient.getQueryData<JobData>(jobQueryKey(jobId));
  if (!!job?.data) return job?.data;

  const all = queryClient.getQueriesData<JobsData | JobData>(jobsQueryKey());
  for (const [_queryKey, _data] of all) {
    const data = _data?.data;
    if (data) {
      if (Array.isArray(data)) {
        for (const job of data) {
          if (job.id === jobId) return job;
        }
      }
    }
  }
}
