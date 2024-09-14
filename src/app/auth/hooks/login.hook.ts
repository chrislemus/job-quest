import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { UserLogin } from '@/app/auth/dto';
import { ApiErrorRes } from '@/api/job-quest/types';
import { jobQuestApi } from '@/api/job-quest';
import { JWT } from '@/api/job-quest/auth/dto';
import { AuthLogInArgs } from '@/api/job-quest/auth/types';
import { useRouter } from 'next/navigation';
import { dashboardUrl } from '@/app/dashboard/constants';

/** User login */
export function useLogin(): UseMutationResult<JWT, ApiErrorRes, UserLogin> {
  const router = useRouter();

  const mutation = useMutation<JWT, ApiErrorRes, UserLogin>({
    mutationFn: (user: AuthLogInArgs) => jobQuestApi.auth.login(user),
    cacheTime: 0,
    onSuccess: () => {
      router.push(dashboardUrl);
    },
  });

  return mutation;
}
