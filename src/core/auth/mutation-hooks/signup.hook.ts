import { useDispatch } from '@common/store';
import { useMutation } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { authService } from '../services';
import { refreshAuthStatus } from '../store';
import { useEffect } from 'react';
import { UserSignUp } from '@core/auth/dto';

export const useSignUp = () => {
  const dispatch = useDispatch();

  const mutation = useMutation<AxiosResponse, AxiosError, UserSignUp, unknown>({
    mutationKey: ['authService.signup'],
    mutationFn: (user: UserSignUp) => authService.signup(user),
  });

  useEffect(() => {
    if (mutation.isSuccess) dispatch(refreshAuthStatus());
  }, [mutation.isSuccess]);

  return mutation;
};
