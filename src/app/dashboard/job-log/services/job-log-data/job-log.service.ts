import { jobQuestHttpService } from '@/api/job-quest/services/job-quest-http.service';
import { CreateJobLogDto, UpdateJobLogDto } from '@/app/dashboard/job/dto';
import { jobQuestApiUrls } from '@/api/job-quest/job-quest-api-urls.const';
import { ApiPageRes } from '@/api/job-quest/dto/api-page-res.dto';
import { JobLogEntity } from '@/app/dashboard/job-log/services/job-log-data/job-log.entity';
import { JobLogPageRes } from './dto/job-log-page-res.dto';
import { validateOrReject } from 'class-validator';
import { plainToInstance } from 'class-transformer';

async function create(jobLog: CreateJobLogDto): Promise<JobLogEntity> {
  const response = await jobQuestHttpService.post<JobLogEntity>(
    jobQuestApiUrls.jobLog.root,
    jobLog
  );

  const data = response?.data;
  return data;
}

/** Update a Job */
async function update(jobLogId: string, updatedJob: UpdateJobLogDto) {
  const response = await jobQuestHttpService.patch<JobLogEntity>(
    jobQuestApiUrls.jobLog.update(jobLogId),
    updatedJob
  );

  const data = response?.data;
  return data;
}

async function getAll(jobId: string): Promise<ApiPageRes<JobLogEntity>> {
  const response = await jobQuestHttpService.get<ApiPageRes<JobLogEntity>>(
    jobQuestApiUrls.jobLog.root,
    { params: { jobId } }
  );

  const data = plainToInstance(JobLogPageRes, response?.data);
  await validateOrReject(data);

  return data;
}

async function deleteJobLog(jobLogId: string) {
  const response = await jobQuestHttpService.delete<JobLogEntity>(
    jobQuestApiUrls.jobLog.delete(jobLogId)
  );

  const data = response?.data;
  return data;
}

export const jobLogService = { create, getAll, update, deleteJobLog };
