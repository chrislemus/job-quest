import { useSelector } from '@common/store';
import { useQuery } from '@tanstack/react-query';
import { userService } from '../services/user.service';

export const useProfile = () => {
  const auth = useSelector((store) => store.auth);

  const profile = useQuery({
    queryFn: userService.getProfile,
    queryKey: ['userService.getProfile'],
    enabled: auth.isAuthenticated,
  });

  return profile;
};
