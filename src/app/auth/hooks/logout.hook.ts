import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { ApiErrorRes } from '@/api/job-quest/types';
import { jobQuestApi } from '@/api/job-quest';
import { useRouter } from 'next/navigation';
import { authLoginUrl } from '@/app/auth/constants';

/** User Logout hook */
export function useLogout(): UseMutationResult<
  unknown,
  ApiErrorRes,
  void,
  unknown
> {
  const router = useRouter();

  const mutation = useMutation<unknown, ApiErrorRes>({
    mutationFn: () => jobQuestApi.auth.logout(),
    onSuccess: () => {
      router.push(authLoginUrl);
    },
  });

  return mutation;
}
