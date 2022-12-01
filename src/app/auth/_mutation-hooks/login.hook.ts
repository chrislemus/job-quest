import { useMutation } from '@tanstack/react-query';
import { authService } from '@app/auth/_services';
import { UserLogin } from '@app/auth/_dto';
import { ApiErrorRes, ApiOkRes } from '@common/api/job-quest/interface';
import { JWT } from '@app/auth/_types';

export const useLogin = () => {
  const mutation = useMutation<ApiOkRes<JWT>, ApiErrorRes, UserLogin>({
    mutationFn: (user: UserLogin) => {
      return authService.login(user.email, user.password);
    },
  });

  return mutation;
};
