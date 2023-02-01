import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { UserSignUp } from '@app/auth/dto';
import { ApiErrorRes, ApiOkRes } from '@api/job-quest/types';
import { JWT } from '@api/job-quest/auth/dto';
import { jobQuestApi } from '@api/job-quest';

/** User signup hook */
export function useSignUp(): UseMutationResult<
  ApiOkRes<JWT>,
  ApiErrorRes,
  UserSignUp
> {
  const mutation = useMutation<ApiOkRes<JWT>, ApiErrorRes, UserSignUp>({
    mutationFn: (user: UserSignUp) => jobQuestApi.auth.signup(user),
    cacheTime: 0,
  });

  return mutation;
}
