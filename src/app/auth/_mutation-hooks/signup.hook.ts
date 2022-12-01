import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { authService } from '../_services';
import { UserSignUp } from '@app/auth/_dto';
import { ApiErrorRes } from '@common/api/job-quest/interface';

export const useSignUp = () => {
  const mutation = useMutation<AxiosResponse, ApiErrorRes, UserSignUp, unknown>(
    {
      mutationKey: ['authService.signup'],
      mutationFn: (user: UserSignUp) => authService.signup(user),
    }
  );

  return mutation;
};
