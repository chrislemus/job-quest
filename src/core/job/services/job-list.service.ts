import { jobQuestHttp, jobQuestHttpConfig } from '@common/api/job-quest';
import { ApiPageRes } from '@common/api/job-quest/interface';
import { JobListEntity } from '@core/job/entities';

/** Fetch all Job Lists */
async function getAll() {
  const response = await jobQuestHttp.get<ApiPageRes<JobListEntity>>(
    jobQuestHttpConfig.urls.jobList.root
  );

  const data = response?.data;
  return data;
}

export const jobListService = { getAll };
