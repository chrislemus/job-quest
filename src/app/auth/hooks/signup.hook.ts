import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { UserSignUp } from '@/app/auth/dto';
import { ApiErrorRes } from '@/api/job-quest/types';
import { JwtDto } from '@/app/auth/services/auth-data/dto';
import { dashboardUrl } from '@/app/dashboard/constants';
import { useRouter } from 'next/navigation';
import { authDataService } from '../services';

/** User signup hook */
export function useSignUp(): UseMutationResult<
  JwtDto,
  ApiErrorRes,
  UserSignUp
> {
  const router = useRouter();

  const mutation = useMutation<JwtDto, ApiErrorRes, UserSignUp>({
    mutationFn: (user: UserSignUp) => authDataService.signup({ body: user }),
    cacheTime: 0,
    onSuccess: () => {
      console.log('onSuccess!');
      router.push(dashboardUrl);
    },
  });

  return mutation;
}
