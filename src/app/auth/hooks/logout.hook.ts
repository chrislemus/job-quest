import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { ApiErrorRes, ApiOkRes } from '@/api/job-quest/types';
import { jobQuestApi } from '@/api/job-quest';
import { useRouter } from 'next/navigation';
import { authLoginUrl } from '@/app/auth/constants';

/** User Logout hook */
export function useLogout(): UseMutationResult<
  ApiOkRes<boolean>,
  ApiErrorRes,
  void,
  unknown
> {
  const router = useRouter();

  const mutation = useMutation<ApiOkRes<boolean>, ApiErrorRes>({
    mutationFn: () => jobQuestApi.auth.logout(),
    onSuccess: () => {
      router.push(authLoginUrl);
    },
  });

  return mutation;
}
