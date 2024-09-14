import { jobQuestHttpService } from '@/api/job-quest/services/job-quest-http.service';
import { jobDataApiUrlConstant } from './job-list-data-api-url.constant';
import { GetAllJobListResBodyDto } from './dto';

/** Fetch all Job Lists */
async function getAll() {
  const url = jobDataApiUrlConstant.root;
  const res = await jobQuestHttpService.get<GetAllJobListResBodyDto>(url);
  const data = GetAllJobListResBodyDto.parse(res.data);
  return data;
}

export const jobListDataService = { getAll };
