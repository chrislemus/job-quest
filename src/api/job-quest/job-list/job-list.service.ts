import { jobQuestHttpService } from '../services/job-quest-http.service';
import { jobQuestApiUrls } from '../job-quest-api-urls.const';
import { ApiPageRes } from '../dto/api-page-res.dto';
import { JobListEntity } from '@api/job-quest/job-list/job-list.entity';

/** Fetch all Job Lists */
async function getAll() {
  const response = await jobQuestHttpService.get<ApiPageRes<JobListEntity>>(
    jobQuestApiUrls.jobList.root
  );
  const data = response?.data;
  return data;
}

export const jobListService = { getAll };
