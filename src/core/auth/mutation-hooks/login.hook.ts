import { useMutation } from '@tanstack/react-query';
import { authService } from '../services';
import { refreshAuthStatus as _refreshAuthStatus } from '../store';
import { UserLogin } from '@core/auth/dto';
import { ApiErrorRes, ApiOkRes } from '@core/http/job-quest/interface';
import { JWT } from '../types';

export const useLogin = () => {
  const mutation = useMutation<ApiOkRes<JWT>, ApiErrorRes, UserLogin>({
    mutationFn: (user: UserLogin) => {
      return authService.login(user.email, user.password);
    },
  });

  return mutation;
};
