import { QueryState, useMutation } from '@tanstack/react-query';
import { queryClient } from '@common/query-client';
import { jobQueryKeyFactory } from '@app/dashboard/job/factories';
import { UpdateJobDto } from '@app/dashboard/job/dto';
import { ApiErrorRes, ApiOkRes } from '@api/job-quest/types';
import { JobEntity } from '@api/job-quest/job/job.entity';
import { jobQuestApi } from '@api/job-quest';
import { JobsData, JobFilters } from './jobs.hook';

export function useUpdateJob() {
  const mutation = useMutation<
    ApiOkRes<JobEntity>,
    ApiErrorRes,
    {
      jobId: number;
      data: UpdateJobDto;
    }
  >({
    mutationFn: (args: { jobId: number; data: UpdateJobDto }) => {
      return jobQuestApi.job.updateJob(args.jobId, args.data);
    },
    onSuccess: async (res) => {
      const updatedJob = res.data;

      queryClient.invalidateQueries({
        // when job list is updated from job panel, we need to update detail query as well.
        // Otherwise when user tries to update job in detail view(job/[id]), the dropdown menu will no be updated.
        refetchType: 'all',
        queryKey: jobQueryKeyFactory.detail(updatedJob.id),
      });

      const [aK1, aK2] = jobQueryKeyFactory.all();

      await queryClient.invalidateQueries({
        refetchType: 'all',
        predicate: (query) => {
          const [k1, k2, k3] = query.queryKey;
          if (k1 === aK1 && k2 === aK2) {
            const jobFiltersKey = k3 as JobFilters | undefined;
            // To ensure job appears on `job list` updates.
            if (jobFiltersKey?.jobListId === updatedJob.jobListId) return true;

            const state = query.state as QueryState<JobsData, unknown>;
            const jobs = state.data?.data;
            const hasJobListData = jobs?.[0] instanceof JobEntity;
            if (hasJobListData) {
              // To ensure job is updated or remove from lists where the job id matches.
              return jobs.some((job) => job.id === updatedJob.id);
            }
          }
          return false;
        },
      });
    },
  });
  return mutation;
}
