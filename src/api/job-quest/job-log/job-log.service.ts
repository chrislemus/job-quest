import { jobQuestHttpService } from '../services/job-quest-http.service';
import { ApiOkRes } from '@api/job-quest/types';
import { CreateJobLogDto, UpdateJobLogDto } from '@app/dashboard/job/dto';
import { jobQuestApiUrls } from '@api/job-quest/job-quest-api-urls.const';
import { ApiPageRes } from '../dto/api-page-res.dto';
import { JobLogEntity } from '@api/job-quest/job-log/job-log.entity';
import { JobLogPageRes } from './dto/job-log-page-res.dto';
import { validateOrReject } from 'class-validator';
import { plainToInstance } from 'class-transformer';

async function create(
  jobLog: CreateJobLogDto
): Promise<ApiOkRes<JobLogEntity>> {
  const response = await jobQuestHttpService.post<ApiOkRes<JobLogEntity>>(
    jobQuestApiUrls.jobLog.root,
    jobLog
  );

  const data = response?.data;
  return data;
}

/** Update a Job */
async function update(jobLogId: number, updatedJob: UpdateJobLogDto) {
  const response = await jobQuestHttpService.patch<ApiOkRes<JobLogEntity>>(
    jobQuestApiUrls.jobLog.update(jobLogId),
    updatedJob
  );

  const data = response?.data;
  return data;
}

async function getAll(jobId: number): Promise<ApiPageRes<JobLogEntity>> {
  const response = await jobQuestHttpService.get<ApiPageRes<JobLogEntity>>(
    jobQuestApiUrls.jobLog.root,
    { params: { jobId } }
  );

  const data = plainToInstance(JobLogPageRes, response?.data);
  await validateOrReject(data);

  return data;
}

async function deleteJobLog(jobLogId: number) {
  const response = await jobQuestHttpService.delete<ApiOkRes<JobLogEntity>>(
    jobQuestApiUrls.jobLog.delete(jobLogId)
  );

  const data = response?.data;
  return data;
}

export const jobLogService = { create, getAll, update, deleteJobLog };
