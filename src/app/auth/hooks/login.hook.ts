import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { UserLogin } from '@app/auth/dto';
import { ApiErrorRes, ApiOkRes } from '@api/job-quest/types';
import { jobQuestApi } from '@api/job-quest';
import { JWT } from '@api/job-quest/auth/dto';
import { AuthLogInArgs } from '@api/job-quest/auth/types';

/** User login */
export function useLogin(): UseMutationResult<
  ApiOkRes<JWT>,
  ApiErrorRes,
  UserLogin
> {
  const mutation = useMutation<ApiOkRes<JWT>, ApiErrorRes, UserLogin>({
    mutationFn: (user: AuthLogInArgs) => {
      return jobQuestApi.auth.login(user);
    },
  });

  return mutation;
}
