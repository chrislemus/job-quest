import { jobQuestHttpService } from '@/api/job-quest/services/job-quest-http.service';
import { UserProfileDto } from '@/app/user/services/user-data/dto';
import { userDataApiUrlConstant } from './user-data-api-url.constant';

/** Fetch user profile data */
async function profile(): Promise<UserProfileDto> {
  const url = userDataApiUrlConstant.profile;
  const res = await jobQuestHttpService.get<UserProfileDto>(url);
  const data = UserProfileDto.parse(res.data);
  return data;
}

export const userService = {
  profile,
};
