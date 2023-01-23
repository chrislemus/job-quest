import { jobQuestApiService, jobQuestApiUrls } from '@common/api';
import { ApiOkRes, ApiPageRes } from '@common/api/job-quest/interface';
import { CreateJobLogDto, UpdateJobLogDto } from '@app/dashboard/job/_dto';
import { JobLogEntity } from '@app/dashboard/job-log/_entities';

async function create(
  jobLog: CreateJobLogDto
): Promise<ApiOkRes<JobLogEntity>> {
  const response = await jobQuestApiService.post<ApiOkRes<JobLogEntity>>(
    jobQuestApiUrls.jobLog.root,
    jobLog
  );

  const data = response?.data;
  return data;
}

/** Update a Job */
async function update(jobLogId: number, updatedJob: UpdateJobLogDto) {
  const response = await jobQuestApiService.patch<ApiOkRes<JobLogEntity>>(
    jobQuestApiUrls.jobLog.update(jobLogId),
    updatedJob
  );

  const data = response?.data;
  return data;
}

async function getAll(jobId: number): Promise<ApiPageRes<JobLogEntity>> {
  const response = await jobQuestApiService.get<ApiPageRes<JobLogEntity>>(
    jobQuestApiUrls.jobLog.root,
    { params: { jobId } }
  );

  const data = response?.data;
  return data;
}

async function deleteJobLog(jobLogId: number) {
  const response = await jobQuestApiService.delete<ApiOkRes<JobLogEntity>>(
    jobQuestApiUrls.jobLog.delete(jobLogId)
  );

  const data = response?.data;
  return data;
}

export const jobLogService = { create, getAll, update, deleteJobLog };
