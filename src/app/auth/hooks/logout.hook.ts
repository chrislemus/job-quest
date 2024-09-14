import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { ApiErrorRes } from '@/api/job-quest/types';
import { useRouter } from 'next/navigation';
import { authSiteUrlConfig } from '@/app/auth/configs';
import { authDataService } from '../services';

/** User Logout hook */
export function useLogout(): UseMutationResult<
  unknown,
  ApiErrorRes,
  void,
  unknown
> {
  const router = useRouter();

  const mutation = useMutation<unknown, ApiErrorRes>({
    mutationFn: () => authDataService.logout(),
    onSuccess: () => {
      router.push(authSiteUrlConfig.login);
    },
  });

  return mutation;
}
