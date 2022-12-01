import { useQuery } from '@tanstack/react-query';
import { userService } from './_services';

export const useUserProfile = () => {
  const profile = useQuery({
    queryFn: userService.getProfile,
    queryKey: ['user', 'profile'],
  });

  return profile;
};
