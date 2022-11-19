import { jobQuestHttp, jobQuestHttpConfig } from '@core/http/job-quest';
import { ApiPageRes } from '@core/http/job-quest/interface';
import { JobListEntity } from '@core/job/entities';

async function getAll() {
  const response = await jobQuestHttp.get<ApiPageRes<JobListEntity>>(
    jobQuestHttpConfig.urls.jobList.root
  );

  const data = response?.data;
  return data;
}

export const jobListService = { getAll };
