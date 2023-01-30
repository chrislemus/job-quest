import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@common/query-client';
import { jobQueryKeyFactory } from '@app/dashboard/job/factories';
import { UpdateJobDto } from '@app/dashboard/job/dto';
import { ApiErrorRes, ApiOkRes } from '@api/job-quest/types';
import { JobEntity } from '@api/job-quest/job/job.entity';
import { JobPageRes } from '@api/job-quest/job/dto';
import { jobQuestApi } from '@api/job-quest';

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
    onSuccess(res) {
      const newJobData = res.data;

      queryClient.invalidateQueries({
        queryKey: jobQueryKeyFactory.detail(newJobData.id),
      });

      const queriesData = queryClient.getQueriesData<JobPageRes>(
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
