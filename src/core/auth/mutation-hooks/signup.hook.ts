import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { authService } from '../services';
import { UserSignUp } from '@core/auth/dto';
import { ApiErrorRes } from '@core/http/job-quest/interface';

export const useSignUp = () => {
  const mutation = useMutation<AxiosResponse, ApiErrorRes, UserSignUp, unknown>(
    {
      mutationKey: ['authService.signup'],
      mutationFn: (user: UserSignUp) => authService.signup(user),
    }
  );

  return mutation;
};
