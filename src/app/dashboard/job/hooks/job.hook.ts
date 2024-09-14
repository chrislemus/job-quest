import { jobQuestApi } from '@/api/job-quest';
import { JobEntity } from '@/app/dashboard/job/services/job-data/job.entity';
import { ApiErrorRes } from '@/api/job-quest/types';
import { QueryFunction, useQuery, UseQueryResult } from '@tanstack/react-query';
import { jobQueryKey as _jobQueryKey } from '@/app/dashboard/job/constants';
import { queryClient } from '@/common/query-client';
import { JobsData, jobsQueryKey } from './jobs.hook';

export type JobData = JobEntity;
export type JobError = ApiErrorRes;

export const jobQueryKey = _jobQueryKey.detail;
export type JobQueryKey = ReturnType<typeof jobQueryKey>;

export const jobQueryFn: QueryFunction<JobData, JobQueryKey> = (ctx) => {
  const { queryKey } = ctx;
  const [_pk, { jobId }] = queryKey;
  return jobQuestApi.job.findById(jobId);
};

export function useJob(jobId: string): UseQueryResult<JobData, JobError> {
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
export function getJobData(jobId: string): JobEntity | undefined {
  const job = queryClient.getQueryData<JobEntity>(jobQueryKey(jobId));
  if (!!job) return job;

  const all = queryClient.getQueriesData<JobsData>(jobsQueryKey());
  for (const [_queryKey, _data] of all) {
    const data = _data?.items;
    if (data) {
      if (Array.isArray(data)) {
        for (const job of data) {
          if (job.id === jobId) return job;
        }
      }
    }
  }
}
