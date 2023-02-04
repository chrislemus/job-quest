import { jobQuestApi } from '@api/job-quest';
import { JobListPageRes } from '@api/job-quest/job-list/dto/job-list-page-res.dto';
import { ApiErrorRes } from '@api/job-quest/types';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { jobListQueryKeyFactory } from '../factories';

export type JobListsData = {
  /** jobList data is in ascending order based on `order` property (eg. jobList.order)*/
  data: JobListPageRes['data'];
  pageInfo: JobListPageRes['pageInfo'];
};

export type JobListsError = ApiErrorRes;

export function useJobLists(): UseQueryResult<JobListPageRes, JobListsError> {
  const query = useQuery<JobListPageRes, ApiErrorRes>({
    queryKey: jobListQueryKeyFactory._base,
    queryFn: async () => {
      const res = await jobQuestApi.jobList.getAll();
      const data = res.data.sort((a, b) => a.order - b.order);
      return { ...res, data };
    },
  });

  return query;
}
