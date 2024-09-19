import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { UserSignUpDto } from '@/app/auth/dto';
import { ApiErrorRes } from '@/api/job-quest/types';
import { JwtDto } from '@/app/auth/services/auth-data/dto';
import { dashboardUrl } from '@/app/dashboard/constants';
import { useRouter } from 'next/navigation';
import { authDataService } from '../services';

/** User signup hook */
export function useSignUp(): UseMutationResult<
  JwtDto,
  ApiErrorRes,
  UserSignUpDto
> {
  const router = useRouter();

  const mutation = useMutation<JwtDto, ApiErrorRes, UserSignUpDto>({
    mutationFn: (user: UserSignUpDto) => authDataService.signup({ body: user }),
    gcTime: 0,
    onSuccess: () => {
      console.log('onSuccess!');
      router.push(dashboardUrl);
    },
  });

  return mutation;
}
