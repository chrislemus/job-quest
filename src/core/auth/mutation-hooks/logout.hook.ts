import { useDispatch } from '@common/store';
import { useMutation } from '@tanstack/react-query';
import { authService } from '../services';
import { useEffect } from 'react';
import { refreshAuthStatus } from '../store';

export const useLogout = () => {
  const dispatch = useDispatch();

  const mutation = useMutation({
    mutationKey: ['authService.logout'],
    mutationFn: authService.logout,
  });

  useEffect(() => {
    if (mutation.isSuccess) {
      dispatch(refreshAuthStatus());
    }
  }, [mutation.isSuccess]);

  return mutation;
};
