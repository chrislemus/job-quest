import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@/common/query-client';
import { UpdateJobDto } from '@/app/dashboard/job/dto';
import { ApiErrorRes, ApiOkRes } from '@/api/job-quest/types';
import { JobEntity } from '@/api/job-quest/job/job.entity';
import { jobQuestApi } from '@/api/job-quest';
import { getJobData, JobData, jobQueryKey } from './job.hook';
import { JobsData, jobsQueryKey } from './jobs.hook';

type Data = ApiOkRes<JobEntity>;
type Error = ApiErrorRes;
type Variables = { jobId: string; data: UpdateJobDto };
type Context = undefined | { oldJob: JobEntity; newJob: JobEntity };

export function useUpdateJob() {
  const mutation = useMutation<Data, Error, Variables, Context>({
    mutationFn: (vars) => {
      return jobQuestApi.job.updateJob(vars.jobId, vars.data);
    },
    onMutate: async ({ jobId, data }) => {
      const oldJob = getJobData(jobId);
      console.log({ oldJob });
      if (oldJob) {
        const { jobListRank, ...resData } = data;
        const newJob: JobEntity = { ...oldJob, ...resData };

        if (jobListRank) {
          newJob.jobListRankTemp = jobListRank;
          newJob.jobListRank = jobListRank.rank;
        }

        // Job Update
        await queryClient.cancelQueries({ queryKey: jobQueryKey(jobId) });
        queryClient.setQueryData<JobData>(jobQueryKey(jobId), (res) => {
          if (res) return { items: newJob };
        });

        // Job Lists Updates
        await updateJobListsData('newJob', { oldJob, newJob });

        return { oldJob, newJob };
      }
    },
    onError: async (_err, variables, ctx) => {
      if (ctx) {
        const { oldJob, newJob } = ctx;
        // Job Lists Updates
        await updateJobListsData('oldJob', { oldJob, newJob });
        // Job Update
        queryClient.setQueryData<JobData>(jobQueryKey(newJob.id), (res) => {
          if (res) return { items: oldJob };
        });
      }
    },
    onSettled: async (_res, _error, _vars, ctx) => {
      if (ctx) {
        const { oldJob, newJob } = ctx;

        const jobLists = uniqueList([oldJob.jobListId, newJob.jobListId]);

        await Promise.all([
          // Job Lists Updates
          ...jobLists.map((jobListId) => {
            return queryClient.invalidateQueries({
              refetchType: 'all',
              queryKey: jobsQueryKey({ jobListId }),
            });
          }),
          // Job Update
          queryClient.invalidateQueries({
            refetchType: 'all',
            queryKey: jobQueryKey(newJob.id),
          }),
        ]);
      }
    },
  });
  return mutation;
}

function uniqueList<T>(list: T[]) {
  const uList: T[] = [];
  for (const item of list) {
    if (!uList.includes(item)) uList.push(item);
  }
  return uList;
}

type JobVersions = { newJob: JobEntity; oldJob: JobEntity };
type SetVersion = keyof JobVersions;

async function updateJobListsData(
  setJob: SetVersion,
  jobVersions: JobVersions
) {
  console.log({ jobVersions, setJob });
  const { oldJob, newJob } = jobVersions;
  const jobToSet = { ...jobVersions[setJob] };

  // Job Lists Updates
  const jobListsUpdates = uniqueList([oldJob.jobListId, newJob.jobListId]);
  const jobListChanged = jobListsUpdates.length > 1;

  console.log({ jobListChanged, jobListsUpdates });
  return Promise.all(
    // Job Lists Updates
    jobListsUpdates.map(async (jobListId) => {
      const queryKey = jobsQueryKey({ jobListId });

      // we don't want NEW data to be overridden
      if (setJob === 'newJob') {
        await queryClient.cancelQueries({ queryKey });
      }

      queryClient.setQueryData<JobsData>(queryKey, (res) => {
        const [_pk, { jobListId }] = queryKey;
        if (res) {
          let jobs = res?.items;
          if (jobListId === jobToSet.jobListId) {
            if (jobListChanged) {
              // ADD
              jobs.push(jobToSet);
            } else {
              // UPDATE
              jobs = jobs.map((job) =>
                job.id === jobToSet.id ? jobToSet : job
              );
            }
            if (setJob == 'newJob' && jobToSet.jobListRankTemp) {
              const sortedJobs = jobs.filter((j) => j.id !== jobToSet.id);
              let pointerJobIdx = sortedJobs.findIndex(
                (j) => j.jobListRank === jobToSet.jobListRankTemp?.rank
              );
              if (jobToSet.jobListRankTemp.placement === 'bottom')
                pointerJobIdx++;
              sortedJobs.splice(pointerJobIdx, 0, jobToSet);
              jobs = [...sortedJobs];
            }
          } else {
            // DELETE
            jobs = jobs.filter((job) => job.id !== jobToSet.id);
          }

          return { ...res, items: jobs };
        }
      });
    })
  );
}
