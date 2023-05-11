import { CreateJobDto, UpdateJobDto } from '@/app/dashboard/job/dto';
import { jobColors } from '@/app/dashboard/job/constants';
import { jobQuestHttpService } from '@/api/job-quest/services/job-quest-http.service';
import { ApiOkRes } from '@/api/job-quest/types';
import { jobQuestApiUrls } from '@/api/job-quest/job-quest-api-urls.const';
import { JobPageRes } from './dto/job-page-res.dto';
import { validateOrReject } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { JobEntity } from '@/api/job-quest/job/job.entity';

/** Fetch all Jobs */
async function getAll(filters?: { jobListId?: number }): Promise<JobPageRes> {
  const response = await jobQuestHttpService.get<JobPageRes>(
    jobQuestApiUrls.job.root,
    { params: filters }
  );

  const data = plainToInstance(JobPageRes, response?.data);
  await validateOrReject(data);

  return data;
}

/** Fetch a Job by ID */
async function findById(id: number) {
  const response = await jobQuestHttpService.get<ApiOkRes<JobEntity>>(
    jobQuestApiUrls.job.findById(id)
  );

  const data = response?.data;
  return data;
}

/** Create a job */
async function createJob(job: CreateJobDto) {
  const response = await jobQuestHttpService.post<ApiOkRes<JobEntity>>(
    jobQuestApiUrls.job.root,
    {
      ...job,
      color: job.color
        ? job.color
        : jobColors[Math.floor(Math.random() * jobColors.length)],
    }
  );
  const data = response?.data;
  return data;
}

/** Update a Job */
async function updateJob(jobId: number, updatedJob: UpdateJobDto) {
  const response = await jobQuestHttpService.patch<ApiOkRes<JobEntity>>(
    jobQuestApiUrls.job.update(jobId),
    updatedJob
  );

  const data = response?.data;
  return data;
}

/** Delete a Job */
async function deleteJob(jobId: number) {
  const response = await jobQuestHttpService.delete<ApiOkRes<JobEntity>>(
    jobQuestApiUrls.job.delete(jobId)
  );

  const data = response?.data;
  return data;
}

export const jobService = { getAll, createJob, findById, updateJob, deleteJob };
