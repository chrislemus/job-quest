import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { authLocalStore, authService } from '@app/auth/_services';
import { UserSignUp } from '@app/auth/_dto';
import { ApiErrorRes, ApiOkRes } from '@common/api/job-quest/interface';
import { JWT } from '@app/auth/_types';

/** User signup hook */
export function useSignUp(): UseMutationResult<
  ApiOkRes<JWT>,
  ApiErrorRes,
  UserSignUp
> {
  const mutation = useMutation<ApiOkRes<JWT>, ApiErrorRes, UserSignUp>({
    mutationFn: (user: UserSignUp) => authService.signup(user),
    onSuccess(data, _variables, _context) {
      const tokens = data?.data;
      if (tokens) authLocalStore.setTokens(tokens);
    },
  });

  return mutation;
}
