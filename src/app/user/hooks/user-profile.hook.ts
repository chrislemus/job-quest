import { jobQuestApi } from '@api/job-quest';
import { ApiErrorRes } from '@api/job-quest/types';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { UserProfile } from '@api/job-quest/user/dto';

export type UserProfileData = UserProfile;
export type UserProfileError = ApiErrorRes;

export function useUserProfile(): UseQueryResult<UserProfile, ApiErrorRes> {
  return useQuery<UserProfileData, UserProfileError>({
    queryFn: async () => {
      const res = await jobQuestApi.user.profile();
      return res.data;
    },
    queryKey: ['user', 'profile'],
  });
}
