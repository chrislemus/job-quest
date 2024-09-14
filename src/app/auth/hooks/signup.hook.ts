import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { UserSignUp } from '@/app/auth/dto';
import { ApiErrorRes } from '@/api/job-quest/types';
import { JWT } from '@/api/job-quest/auth/dto';
import { jobQuestApi } from '@/api/job-quest';
import { dashboardUrl } from '@/app/dashboard/constants';
import { useRouter } from 'next/navigation';

/** User signup hook */
export function useSignUp(): UseMutationResult<JWT, ApiErrorRes, UserSignUp> {
  const router = useRouter();

  const mutation = useMutation<JWT, ApiErrorRes, UserSignUp>({
    mutationFn: (user: UserSignUp) => jobQuestApi.auth.signup(user),
    cacheTime: 0,
    onSuccess: () => {
      console.log('onSuccess!');
      router.push(dashboardUrl);
    },
  });

  return mutation;
}
