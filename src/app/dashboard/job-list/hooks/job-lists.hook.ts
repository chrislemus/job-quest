import { ApiErrorRes as JobListsError } from '@/shared/types';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { jobListQueryKey as _jobListQueryKey } from '@/app/dashboard/job-list/constants';
import { GetAllJobListResBodyDto, jobListDataService } from '../services';

export const jobListQueryKey = _jobListQueryKey.all;
export type JobListQueryKey = typeof jobListQueryKey;

export function useJobLists(): UseQueryResult<
  GetAllJobListResBodyDto,
  JobListsError
> {
  const query = useQuery<
    GetAllJobListResBodyDto,
    JobListsError,
    GetAllJobListResBodyDto,
    JobListQueryKey
  >({
    queryKey: jobListQueryKey,
    queryFn: async () => {
      const res = await jobListDataService.getAll();
      const data = res.items.sort((a, b) => a.order - b.order);
      return { ...res, data };
    },
  });

  return query;
}
