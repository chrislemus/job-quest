import { jobs as _jobs } from './mocks.const';
import { JobEntity } from '@core/job/entities';
import { AddJobDto, EditJobDto } from '../dto';
import { jobBackgroundColors } from '../const';
import { jobQuestHttp, jobQuestHttpConfig } from '@core/http/job-quest';
import { ApiPageRes } from '@core/http/job-quest/interface';

async function getAll(params?: { jobListId?: number }) {
  const response = await jobQuestHttp.get<ApiPageRes<JobEntity>>(
    jobQuestHttpConfig.urls.job.root,
    { params }
  );

  const data = response?.data;
  return data;
}

function findById(id: number) {
  return new Promise<JobEntity>((resolve, reject) => {
    const job = _jobs.find((j) => j.id === id);
    if (job) {
      resolve(job);
    } else {
      reject('no job found');
    }
  });
}

function addJob(job: AddJobDto) {
  return new Promise<AddJobDto>((resolve, _reject) => {
    const id = _jobs.length + 1;

    const backgroundColor =
      jobBackgroundColors[
        Math.round(Math.random() * jobBackgroundColors.length)
      ];

    // _jobs.push({
    //   ...job,
    //   id,
    //   color: backgroundColor,
    //   location: null,
    //   salary: null,
    //   url:
    // });
    resolve(job);
  });
}

function editJob(jobId: number, updatedJob: EditJobDto) {
  return new Promise<JobEntity>((resolve, reject) => {
    let jobIdx: undefined | number;
    const foundJob = _jobs.find((j, idx) => {
      const foundJob = j.id === jobId;
      if (foundJob) {
        jobIdx = idx;
        return foundJob;
      }
    });

    if ((jobIdx === 0 || !!jobIdx) && foundJob) {
      _jobs[jobIdx] = {
        ...foundJob,
        ...updatedJob,
      };
      resolve(_jobs[jobIdx]);
    } else {
      reject('job not found');
    }
  });
}

export const jobService = { getAll, addJob, findById, editJob };
