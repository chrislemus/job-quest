import { CreateJobDto, UpdateJobDto } from '@/app/dashboard/job/dto';
import { jobColors } from '@/app/dashboard/job/constants';
import { jobQuestHttpService } from '@/shared/services';
import { jobDataApiUrlConstant } from './job-data-api-url.constant';
import { JobDto } from './dto';
import {
  GetAllJobsReqConfigDto,
  GetAllJobsResBodyDto,
} from './dto/get-all-jobs-resource.dto';

/** Fetch all Jobs */
async function getAll(
  config?: GetAllJobsReqConfigDto
): Promise<GetAllJobsResBodyDto> {
  const { queryParams } = GetAllJobsReqConfigDto.parse(config || {});
  const url = jobDataApiUrlConstant.root;
  const res = await jobQuestHttpService.get<GetAllJobsResBodyDto>(url, {
    params: queryParams,
  });
  const data = GetAllJobsResBodyDto.parse(res?.data);
  return data;
}

/** Fetch a Job by ID */
async function findById(id: string) {
  const response = await jobQuestHttpService.get<JobDto>(
    jobDataApiUrlConstant.findById(id)
  );

  const data = response?.data;
  return data;
}

/** Create a job */
async function createJob(job: CreateJobDto) {
  const response = await jobQuestHttpService.post<JobDto>(
    jobDataApiUrlConstant.root,
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
async function updateJob(jobId: string, updatedJob: UpdateJobDto) {
  const response = await jobQuestHttpService.patch<JobDto>(
    jobDataApiUrlConstant.update(jobId),
    updatedJob
  );

  const data = response?.data;
  return data;
}

/** Delete a Job */
async function deleteJob(jobId: string) {
  const response = await jobQuestHttpService.delete<JobDto>(
    jobDataApiUrlConstant.delete(jobId)
  );

  const data = response?.data;
  return data;
}

export const jobDataService = {
  getAll,
  createJob,
  findById,
  updateJob,
  deleteJob,
};
