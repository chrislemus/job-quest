import { jobQuestApiService, jobQuestApiUrls } from '@common/api/job-quest';
import { UserProfile } from '@app/user/_types';

/** Fetch user profile data */
async function getProfile(): Promise<UserProfile> {
  const res = await jobQuestApiService.get<{ data: UserProfile }>(
    jobQuestApiUrls.user.profile
  );

  const data = res?.data;
  return data?.data;
}

export const userService = {
  getProfile,
};
