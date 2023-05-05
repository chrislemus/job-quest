import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@common/query-client';
import { jobKeys } from '@app/dashboard/job/factories';
import { UpdateJobDto } from '@app/dashboard/job/dto';
import { ApiErrorRes, ApiOkRes } from '@api/job-quest/types';
import { JobEntity } from '@api/job-quest/job/job.entity';
import { jobQuestApi } from '@api/job-quest';
import { JobsData } from './jobs.hook';

export function useUpdateJob() {
  const mutation = useMutation<
    ApiOkRes<JobEntity>,
    ApiErrorRes,
    {
      jobId: number;
      data: UpdateJobDto;
    },
    { prevJob?: JobEntity }
  >({
    mutationFn: (args: { jobId: number; data: UpdateJobDto }) => {
      return jobQuestApi.job.updateJob(args.jobId, args.data);
    },
    onMutate: (args: { jobId: number; data: UpdateJobDto }) => {
      const { jobId } = args;

      const all = queryClient.getQueriesData<JobsData>(jobKeys.all());

      for (const [_queryKey, data] of all) {
        if (data) {
          for (const job of data.data) {
            if (job.id === jobId) return { prevJob: job };
          }
        }
      }
    },
    onSuccess: async (res, _vars, ctx) => {
      const updatedJob = res.data;

      const invalidateByFilteredList = (jobListId: number) => {
        queryClient.invalidateQueries({
          refetchType: 'all',
          queryKey: jobKeys.all({
            jobListId,
          }),
        });
      };

      invalidateByFilteredList(updatedJob.jobListId);
      const prevJob = ctx?.prevJob;
      if (prevJob && updatedJob.jobListId !== prevJob.jobListId) {
        invalidateByFilteredList(prevJob.jobListId);
      }

      queryClient.invalidateQueries({
        // when job list is updated from job panel, we need to update detail query as well.
        // Otherwise when user tries to update job in detail view(job/[id]), the dropdown menu will no be updated.
        refetchType: 'all',
        queryKey: jobKeys.detail(updatedJob.id),
      });
    },
  });
  return mutation;
}
