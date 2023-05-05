import { jobQuestApi } from '@api/job-quest';
import { JobEntity } from '@api/job-quest/job/job.entity';
import { ApiErrorRes, ApiOkRes } from '@api/job-quest/types';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { jobKeys } from '@app/dashboard/job/factories';

export type JobData = ApiOkRes<JobEntity>;
export type JobError = ApiErrorRes;

export function useJob(jobId: number): UseQueryResult<JobData, JobError> {
  const query = useQuery<JobData, JobError>({
    queryKey: jobKeys.detail(jobId),
    queryFn: () => {
      return jobQuestApi.job.findById(jobId);
    },
    // TODO: add mutation logic using query client
    // enabled: !deleteJobMutation.isLoading && !deleteJobMutation.isSuccess,
  });
  return query;
}
