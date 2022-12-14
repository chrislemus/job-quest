import { JobEntity } from '@app/dashboard/job/_entities';
import { CreateJobDto, UpdateJobDto } from '@app/dashboard/job/_dto';
import { jobColors } from '@app/dashboard/job/_ constants';
import { jobQuestApiService, jobQuestApiUrls } from '@common/api/job-quest';
import { ApiOkRes, ApiPageRes } from '@common/api/job-quest/interface';

/** Fetch all Jobs */
async function getAll(filters?: { jobListId?: number }) {
  const response = await jobQuestApiService.get<ApiPageRes<JobEntity>>(
    jobQuestApiUrls.job.root,
    { params: filters }
  );

  const data = response?.data;
  return data;
}

/** Fetch a Job by ID */
async function findById(id: number) {
  const response = await jobQuestApiService.get<ApiOkRes<JobEntity>>(
    jobQuestApiUrls.job.findById(id)
  );

  const data = response?.data;
  return data;
}

/** Create a job */
async function createJob(job: CreateJobDto) {
  const response = await jobQuestApiService.post<ApiOkRes<JobEntity>>(
    jobQuestApiUrls.job.root,
    {
      ...job,
      color: job.color
        ? job.color
        : jobColors[Math.round(Math.random() * jobColors.length)],
    }
  );

  const data = response?.data;
  return data;
}

/** Update a Job */
async function updateJob(jobId: number, updatedJob: UpdateJobDto) {
  const response = await jobQuestApiService.patch<ApiOkRes<JobEntity>>(
    jobQuestApiUrls.job.update(jobId),
    updatedJob
  );

  const data = response?.data;
  return data;
}

/** Delete a Job */
async function deleteJob(jobId: number) {
  const response = await jobQuestApiService.delete<ApiOkRes<JobEntity>>(
    jobQuestApiUrls.job.delete(jobId)
  );

  const data = response?.data;
  return data;
}

export const jobService = { getAll, createJob, findById, updateJob, deleteJob };
