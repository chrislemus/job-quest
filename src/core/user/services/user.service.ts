import { jobQuestHttp, jobQuestHttpConfig } from '@core/http/job-quest';
import { UserProfile } from '../interfaces';

/** Fetch user profile data */
async function getProfile(): Promise<UserProfile> {
  const res = await jobQuestHttp.get<{ data: UserProfile }>(
    jobQuestHttpConfig.urls.user.profile
  );

  const data = res?.data;
  return data?.data;
}

export const userService = {
  getProfile,
};
