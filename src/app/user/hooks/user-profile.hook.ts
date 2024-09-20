import { ApiErrorRes } from '@/shared/types';
import { QueryFunction, useQuery, UseQueryResult } from '@tanstack/react-query';
import { UserProfileDto } from '@/app/user/services/user-data/dto';
import { userQueryKey as _userQueryKey } from '@/app/user/constants';
import { userDataService } from '../services';

export const userQueryKey = _userQueryKey.detail;
export type UserQueryKey = typeof userQueryKey;

export type UserProfileData = UserProfileDto;
export type UserProfileError = ApiErrorRes;
export const userQueryFn: QueryFunction<UserProfileDto> = async () => {
  const res = await userDataService.profile();
  return res;
};

export function useUser(): UseQueryResult<UserProfileDto, ApiErrorRes> {
  const query = useQuery<UserProfileData, UserProfileError>({
    queryFn: userQueryFn,
    queryKey: userQueryKey,
  });
  return query;
}
