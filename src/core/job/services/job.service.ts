import { jobs as _jobs } from './mocks.const';
import { JobEntity } from '@core/job/entities';
import { CreateJobDto, UpdateJobDto } from '../dto';
import { jobBackgroundColors } from '../const';
import { jobQuestHttp, jobQuestHttpConfig } from '@core/http/job-quest';
import { ApiOkRes, ApiPageRes } from '@core/http/job-quest/interface';

async function getAll(params?: { jobListId?: number }) {
  const response = await jobQuestHttp.get<ApiPageRes<JobEntity>>(
    jobQuestHttpConfig.urls.job.root,
    { params }
  );

  const data = response?.data;
  return data;
}

async function findById(id: number) {
  const response = await jobQuestHttp.get<ApiOkRes<JobEntity>>(
    jobQuestHttpConfig.urls.job.findById(id)
  );

  const data = response?.data;
  return data;
}

async function createJob(job: CreateJobDto) {
  const response = await jobQuestHttp.post<ApiOkRes<JobEntity>>(
    jobQuestHttpConfig.urls.job.root,
    {
      ...job,
      color: job.color
        ? job.color
        : jobBackgroundColors[
            Math.round(Math.random() * jobBackgroundColors.length)
          ],
    }
  );

  const data = response?.data;
  return data;
}

async function updateJob(jobId: number, updatedJob: UpdateJobDto) {
  const response = await jobQuestHttp.patch<ApiOkRes<JobEntity>>(
    jobQuestHttpConfig.urls.job.update(jobId),
    updatedJob
  );

  const data = response?.data;
  return data;
}

async function deleteJob(jobId: number) {
  const response = await jobQuestHttp.delete<ApiOkRes<JobEntity>>(
    jobQuestHttpConfig.urls.job.delete(jobId)
  );

  const data = response?.data;
  return data;
}

export const jobService = { getAll, createJob, findById, updateJob, deleteJob };
