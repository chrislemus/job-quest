import { ApiErrorRes } from '@/shared/types';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { jobQueryKey as _jobQueryKey } from '@/app/dashboard/job/constants';
import { GetAllJobRanksResBodyDto, jobDataService } from '../services';

export type JobRankData = GetAllJobRanksResBodyDto;
export type JobRankError = ApiErrorRes;

export const jobRankQueryKey = _jobQueryKey.allJobRanks;
export type JobRanksQueryKey = ReturnType<typeof jobRankQueryKey>;

export function useJobRanksQuery(
  jobListId: string
): UseQueryResult<JobRankData, JobRankError> {
  const query = useQuery<
    JobRankData,
    JobRankError,
    JobRankData,
    JobRanksQueryKey
  >({
    queryKey: jobRankQueryKey({ queryParams: { jobListId } }),
    enabled: !!jobListId,
    queryFn: (ctx) => {
      const { queryKey } = ctx;
      const [_pk, _subCollection, params] = queryKey;
      const jobListId = params.queryParams?.jobListId;
      if (!jobListId) throw new Error('jobListId is required');
      return jobDataService.getAllJobRanks({ queryParams: { jobListId } });
    },
  });
  return query;
}

// /**
//  * utility function for extracting job data
//  * - job data can be find individually (query by ID)
//  * - or in a list (jobs query with filters)
//  */
// export function getJobRanksData(jobListId: string): JobDto | undefined {
//   const job = queryClient.getQueryData<JobDto>(
//     jobRankQueryKey({ queryParams: { jobListId } })
//   );
//   if (!!job) return job;

//   const all = queryClient.getQueriesData<JobsData>({
//     queryKey: jobsQueryKey(),
//   });
//   for (const [_queryKey, _data] of all) {
//     const data = _data?.items;
//     if (data) {
//       if (Array.isArray(data)) {
//         for (const job of data) {
//           if (job.id === jobId) return job;
//         }
//       }
//     }
//   }
// }
