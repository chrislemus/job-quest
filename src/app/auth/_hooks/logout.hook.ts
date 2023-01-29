import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { ApiErrorRes, ApiOkRes } from '@api/job-quest/types';
import { jobQuestApi } from '@api/job-quest';

/** User Logout hook */
export function useLogout(): UseMutationResult<
  ApiOkRes<boolean>,
  ApiErrorRes,
  void,
  unknown
> {
  const mutation = useMutation<ApiOkRes<boolean>, ApiErrorRes>({
    mutationFn: () => jobQuestApi.auth.logout(),
  });

  return mutation;
}
