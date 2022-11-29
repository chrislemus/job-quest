import { useDispatch } from '@common/store';
import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { authService } from '../services';
import { refreshAuthStatus } from '../store';
import { useEffect } from 'react';
import { UserSignUp } from '@core/auth/dto';
import { ApiErrorRes } from '@core/http/job-quest/interface';

export const useSignUp = () => {
  const dispatch = useDispatch();

  const mutation = useMutation<AxiosResponse, ApiErrorRes, UserSignUp, unknown>(
    {
      mutationKey: ['authService.signup'],
      mutationFn: (user: UserSignUp) => authService.signup(user),
    }
  );

  useEffect(() => {
    if (mutation.isSuccess) dispatch(refreshAuthStatus());
  }, [mutation.isSuccess]);

  return mutation;
};
