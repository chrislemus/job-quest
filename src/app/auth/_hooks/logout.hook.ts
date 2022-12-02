import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { authLocalStore, authService } from '@app/auth/_services';
import { ApiErrorRes, ApiOkRes } from '@common/api/job-quest/interface';

/** User Logout hook */
export function useLogout(): UseMutationResult<
  ApiOkRes<boolean>,
  ApiErrorRes,
  void,
  unknown
> {
  const mutation = useMutation<ApiOkRes<boolean>, ApiErrorRes>({
    mutationFn: () => authService.logout(),
    onSuccess(data, _variables, _context) {
      const logOutSuccess: boolean = data?.data;
      if (logOutSuccess) authLocalStore.removeTokens();
    },
  });

  return mutation;
}
