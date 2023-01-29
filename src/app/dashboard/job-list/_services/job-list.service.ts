import { jobQuestApiService, jobQuestApiUrls } from '@common/api/job-quest';
import { ApiPageRes } from '@common/api/job-quest/types';
import { JobListEntity } from '@app/dashboard/job-list/_entities';

/** Fetch all Job Lists */
async function getAll() {
  const response = await jobQuestApiService.get<ApiPageRes<JobListEntity>>(
    jobQuestApiUrls.jobList.root
  );
  const data = response?.data;
  return data;
}

export const jobListService = { getAll };
