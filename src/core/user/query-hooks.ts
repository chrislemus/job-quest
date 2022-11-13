import { useSelector } from '@common/store';
import { useQuery } from '@tanstack/react-query';
import { userService } from './services/user.service';

export const useUserProfile = () => {
  const auth = useSelector((store) => store.auth);

  const profile = useQuery({
    queryFn: userService.getProfile,
    queryKey: ['user', 'profile'],
    enabled: auth.isAuthenticated,
  });

  return profile;
};
