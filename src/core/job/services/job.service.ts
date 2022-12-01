import { JobEntity } from '@core/job/entities';
import { CreateJobDto, UpdateJobDto } from '../dto';
import { jobBackgroundColors } from '../const';
import { jobQuestHttp, jobQuestHttpConfig } from '@common/api/job-quest';
import { ApiOkRes, ApiPageRes } from '@common/api/job-quest/interface';

/** Fetch all Jobs */
async function getAll(params?: { jobListId?: number }) {
  const response = await jobQuestHttp.get<ApiPageRes<JobEntity>>(
    jobQuestHttpConfig.urls.job.root,
    { params }
  );

  const data = response?.data;
  return data;
}

/** Fetch a Job by ID */
async function findById(id: number) {
  const response = await jobQuestHttp.get<ApiOkRes<JobEntity>>(
    jobQuestHttpConfig.urls.job.findById(id)
  );

  const data = response?.data;
  return data;
}

/** Create a job */
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

/** Update a Job */
async function updateJob(jobId: number, updatedJob: UpdateJobDto) {
  const response = await jobQuestHttp.patch<ApiOkRes<JobEntity>>(
    jobQuestHttpConfig.urls.job.update(jobId),
    updatedJob
  );

  const data = response?.data;
  return data;
}

/** Delete a Job */
async function deleteJob(jobId: number) {
  const response = await jobQuestHttp.delete<ApiOkRes<JobEntity>>(
    jobQuestHttpConfig.urls.job.delete(jobId)
  );

  const data = response?.data;
  return data;
}

export const jobService = { getAll, createJob, findById, updateJob, deleteJob };
