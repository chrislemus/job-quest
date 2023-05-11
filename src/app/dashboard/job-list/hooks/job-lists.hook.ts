import { jobQuestApi } from '@/api/job-quest';
import { JobListPageRes as JobListData } from '@/api/job-quest/job-list/dto/job-list-page-res.dto';
import { ApiErrorRes as JobListsError } from '@/api/job-quest/types';
import { QueryFunction, useQuery, UseQueryResult } from '@tanstack/react-query';
import { jobListQueryKey as _jobListQueryKey } from '@/app/dashboard/job-list/constants';

export const jobListQueryKey = _jobListQueryKey.all;
export type JobListQueryKey = typeof jobListQueryKey;

export const jobsListQueryFn: QueryFunction<
  JobListData,
  JobListQueryKey
> = async () => {
  const res = await jobQuestApi.jobList.getAll();
  const data = res.data.sort((a, b) => a.order - b.order);
  return { ...res, data };
};

export function useJobLists(): UseQueryResult<JobListData, JobListsError> {
  const query = useQuery<
    JobListData,
    JobListsError,
    JobListData,
    JobListQueryKey
  >({
    queryKey: jobListQueryKey,
    queryFn: jobsListQueryFn,
  });

  return query;
}
