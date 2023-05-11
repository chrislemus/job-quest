import { jobQuestApi } from '@/api/job-quest';
import { ApiErrorRes } from '@/api/job-quest/types';
import { QueryFunction, useQuery, UseQueryResult } from '@tanstack/react-query';
import { UserProfile } from '@/api/job-quest/user/dto';
import { userQueryKey as _userQueryKey } from '@/app/user/constants';

export const userQueryKey = _userQueryKey.detail;
export type UserQueryKey = typeof userQueryKey;

export type UserProfileData = UserProfile;
export type UserProfileError = ApiErrorRes;
export const userQueryFn: QueryFunction<UserProfile> = async () => {
  const res = await jobQuestApi.user.profile();
  return res.data;
};

export function useUser(): UseQueryResult<UserProfile, ApiErrorRes> {
  const query = useQuery<UserProfileData, UserProfileError>({
    queryFn: userQueryFn,
    queryKey: userQueryKey,
  });
  return query;
}
