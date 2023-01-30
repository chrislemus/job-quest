import { jobQuestApi } from '@api/job-quest';
import { ApiErrorRes } from '@api/job-quest/types';
import { useQuery } from '@tanstack/react-query';
import { UserProfile } from '@app/user/types';

export type UserProfileData = UserProfile;
export type UserProfileError = ApiErrorRes;

export function useUserProfile() {
  return useQuery<UserProfileData, UserProfileError>({
    queryFn: jobQuestApi.user.profile,
    queryKey: ['user', 'profile'],
  });
}
