import { jobQuestApi } from '@api/job-quest';
import { JobListPageRes } from '@api/job-quest/job-list/dto/job-list-page-res.dto';
import { ApiErrorRes } from '@api/job-quest/types';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

export type JobListsData = JobListPageRes;
export type JobListsError = ApiErrorRes;

export function useJobLists(): UseQueryResult<JobListPageRes, JobListsError> {
  const query = useQuery<JobListPageRes, ApiErrorRes>({
    queryKey: ['jobList'],
    queryFn: () => {
      return jobQuestApi.jobList.getAll();
    },
  });

  return query;
}
