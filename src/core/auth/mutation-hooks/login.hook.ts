import { User } from '@app/dto';
import { useDispatch } from '@common/store';
import { useMutation } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { authService } from '../services';
import { refreshAuthStatus as _refreshAuthStatus } from '../store';
import { useEffect } from 'react';

export const useLogin = () => {
  const dispatch = useDispatch();

  const mutation = useMutation<AxiosResponse, AxiosError, User, unknown>({
    mutationKey: ['authService.login'],
    mutationFn: (user: { email: string; password: string }) =>
      authService.login(user.email, user.password),
  });

  const refreshAuthStatus = () => dispatch(_refreshAuthStatus());

  useEffect(() => {
    if (mutation.isSuccess) refreshAuthStatus();
  }, [mutation.isSuccess]);

  useEffect(() => {
    refreshAuthStatus();
  }, []);

  return mutation;
};
