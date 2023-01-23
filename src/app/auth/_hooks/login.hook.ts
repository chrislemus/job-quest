import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { authLocalStore, authService } from '@app/auth/_services';
import { UserLogin } from '@app/auth/_dto';
import { ApiErrorRes, ApiOkRes } from '@common/api/job-quest/types';
import { JWT } from '@app/auth/_types';

/** User login */
export function useLogin(): UseMutationResult<
  ApiOkRes<JWT>,
  ApiErrorRes,
  UserLogin
> {
  const mutation = useMutation<ApiOkRes<JWT>, ApiErrorRes, UserLogin>({
    mutationFn: (user: UserLogin) => {
      return authService.login(user.email, user.password);
    },
    onSuccess(data, _variables, _context) {
      const tokens = data?.data;
      if (tokens) authLocalStore.setTokens(tokens);
    },
  });

  return mutation;
}
