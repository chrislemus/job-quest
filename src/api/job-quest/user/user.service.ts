import { jobQuestHttpService } from '@/api/job-quest/services/job-quest-http.service';
import { UserProfileRes } from '@/api/job-quest/user/dto';
import { validateOrReject } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { jobQuestApiUrls } from '@/api/job-quest/job-quest-api-urls.const';

/** Fetch user profile data */
async function profile(): Promise<UserProfileRes> {
  const res = await jobQuestHttpService
    .get<UserProfileRes>(jobQuestApiUrls.user.profile)
    .then(async (res) => {
      const data = plainToInstance(UserProfileRes, res.data);
      await validateOrReject(data);
      return data;
    });
  return res;
}

export const userService = {
  profile,
};
