import { useMutation } from '@tanstack/react-query';
import { jobService } from '@app/dashboard/job/_services';
import { queryClient } from '@common/query-client';
import { jobQueryKeyFactory } from '@app/dashboard/job/_factories';
import { UpdateJobDto } from '@app/dashboard/job/_dto';
import { ApiPageRes } from '@common/api/job-quest/interface';
import { JobEntity } from '@app/dashboard/job/_entities';

export function useUpdateJob() {
  const mutation = useMutation({
    mutationFn: (args: { jobId: number; data: UpdateJobDto }) => {
      return jobService.updateJob(args.jobId, args.data);
    },
    onSuccess(res) {
      const newJobData = res.data;

      queryClient.invalidateQueries({
        queryKey: jobQueryKeyFactory.detail(newJobData.id),
      });

      const queriesData = queryClient.getQueriesData<ApiPageRes<JobEntity>>(
        jobQueryKeyFactory.all()
      );

      // TODO: improve performance
      if (queriesData) {
        let foundMatch = false;
        for (const queryData of queriesData) {
          if (foundMatch) return;
          const [_queryKey, data] = queryData;
          if (data) {
            if (foundMatch) return;
            for (const job of data.data) {
              if (job.id === newJobData.id && job.id !== newJobData.jobListId) {
                foundMatch = true;
                queryClient.invalidateQueries({
                  queryKey: jobQueryKeyFactory.all({
                    jobListId: job.jobListId,
                  }),
                });
              }
            }
          }
        }
      }

      queryClient.invalidateQueries({
        queryKey: jobQueryKeyFactory.all({ jobListId: newJobData.jobListId }),
      });
    },
  });
  return mutation;
}
