import { jobQuestHttpService } from '../services/job-quest-http.service';
import { UserProfile } from '@app/user/_types';
import { jobQuestApiUrls } from '@api/job-quest/job-quest-api-urls.const';

/** Fetch user profile data */
async function profile(): Promise<UserProfile> {
  const res = await jobQuestHttpService.get<{ data: UserProfile }>(
    jobQuestApiUrls.user.profile
  );

  const data = res?.data;
  return data?.data;
}

export const userService = {
  profile,
};
