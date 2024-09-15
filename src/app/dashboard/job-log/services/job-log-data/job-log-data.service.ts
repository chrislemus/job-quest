import { jobQuestHttpService } from '@/api/job-quest/services/job-quest-http.service';
import { CreateJobLogDto, UpdateJobLogDto } from '@/app/dashboard/job/dto';
import { JobLogPageResBodyDto } from './dto/job-log-page-res-body.dto';
import { JobLogItemDto } from './dto';
import { jobLogDataApiUrlConstant } from './job-log-data-api-url.constant';

async function create(jobLog: CreateJobLogDto): Promise<JobLogItemDto> {
  const response = await jobQuestHttpService.post<JobLogItemDto>(
    jobLogDataApiUrlConstant.root,
    jobLog
  );

  const data = response?.data;
  return data;
}

/** Update a Job */
async function update(jobLogId: string, updatedJob: UpdateJobLogDto) {
  const response = await jobQuestHttpService.patch<JobLogItemDto>(
    jobLogDataApiUrlConstant.update(jobLogId),
    updatedJob
  );

  const data = response?.data;
  return data;
}

async function getAll(jobId: string): Promise<JobLogPageResBodyDto> {
  const url = jobLogDataApiUrlConstant.root;
  const res = await jobQuestHttpService.get<JobLogPageResBodyDto>(url, {
    params: { jobId },
  });
  const data = JobLogPageResBodyDto.parse(res.data);
  return data;
}

async function deleteJobLog(jobLogId: string) {
  const response = await jobQuestHttpService.delete<JobLogItemDto>(
    jobLogDataApiUrlConstant.delete(jobLogId)
  );

  const data = response?.data;
  return data;
}

export const jobLogService = { create, getAll, update, deleteJobLog };
