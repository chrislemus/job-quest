import { jobQuestApi } from '@api/job-quest';
import { JobLogPageRes } from '@api/job-quest/job-log/dto';
import { ApiErrorRes } from '@api/job-quest/types';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { jobLogQueryKeyFactory } from '@app/dashboard/job-log/factories';

export function useJobLogs(
  jobId: number
): UseQueryResult<JobLogPageRes, ApiErrorRes> {
  const query = useQuery<JobLogPageRes, ApiErrorRes>({
    queryKey: jobLogQueryKeyFactory.all(jobId),
    queryFn: () => {
      return jobQuestApi.jobLog.getAll(jobId);
    },
  });

  return query;
}
