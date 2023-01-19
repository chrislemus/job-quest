import { jobQuestApiService, jobQuestApiUrls } from '@common/api';
import { ApiOkRes, ApiPageRes } from '@common/api/job-quest/interface';
import { CreateJobLogDto } from '../_dto';
import { JobLogEntity } from '../_entities';

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

async function getAll(jobId: number): Promise<ApiPageRes<JobLogEntity>> {
  const response = await jobQuestApiService.get<ApiPageRes<JobLogEntity>>(
    jobQuestApiUrls.jobLog.root,
    { params: { jobId } }
  );

  const data = response?.data;
  return data;
}

export const jobLogService = { create, getAll };
