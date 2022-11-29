import { useMutation } from '@tanstack/react-query';
import { authService } from '../services';

export const useLogout = () => {
  const mutation = useMutation({
    mutationKey: ['authService.logout'],
    mutationFn: authService.logout,
  });

  return mutation;
};
