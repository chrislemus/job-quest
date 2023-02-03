import { QueryState, useMutation } from '@tanstack/react-query';
import { queryClient } from '@common/query-client';
import { jobQueryKeyFactory } from '@app/dashboard/job/factories';
import { UpdateJobDto } from '@app/dashboard/job/dto';
import { ApiErrorRes, ApiOkRes } from '@api/job-quest/types';
import { JobEntity } from '@api/job-quest/job/job.entity';
import { JobPageRes } from '@api/job-quest/job/dto';
import { jobQuestApi } from '@api/job-quest';
import { jobListQueryKeyFactory } from '@app/dashboard/job-list/factories';
import { JobsData } from './jobs.hook';

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

      const [aK1, aK2] = jobQueryKeyFactory.all();

      queryClient.invalidateQueries({
        // queryKey: jobQueryKeyFactory.all(),
        predicate: (query) => {
          const { queryKey } = query;
          const [k1, k2] = queryKey;
          if (k1 === aK1 && k2 === aK2) {
            const state = query.state as QueryState<JobsData, unknown>;
            const data = state.data?.data;
            const firstJob = data?.[0];
            if (!!firstJob && !!firstJob.jobListId && !!firstJob.id) {
              for (const job of data) {
                if (job.id === newJobData.id) {
                  console.log('newJobData.id', newJobData.id);
                  console.log('j.id', job.id);
                  console.log(
                    'j.id === newJobData.id',
                    job.id === newJobData.id
                  );

                  return true;
                }
              }
              // const res = data.some((j) => {
              //   console.log('newJobData.id', newJobData.id);
              //   console.log('j.id', j.id);
              //   console.log('j.id === newJobData.id', j.id === newJobData.id);
              //   j.id === newJobData.id;
              // });
              // console.log('res', res);
              // console.log('data', data);
              return false;
            }
          }
          return false;
        },
      });

      // TODO: improve performance
      // if (queriesData) {
      //   let foundMatch = false;
      //   for (const queryData of queriesData) {
      //     if (foundMatch) return;
      //     const [_queryKey, data] = queryData;
      //     if (data) {
      //       if (foundMatch) return;
      //       for (const job of data.data) {
      //         if (job.id === newJobData.id && job.id !== newJobData.jobListId) {
      //           foundMatch = true;
      //           queryClient.invalidateQueries({
      //             queryKey: jobQueryKeyFactory.all({
      //               jobListId: job.jobListId,
      //             }),
      //           });
      //         }
      //       }
      //     }
      //   }
      // }

      // queryClient.invalidateQueries({
      //   queryKey: jobQueryKeyFactory.all({ jobListId: newJobData.jobListId }),
      // });
    },
  });
  return mutation;
}
