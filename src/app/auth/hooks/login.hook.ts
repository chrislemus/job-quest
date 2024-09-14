import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { ApiErrorRes } from '@/api/job-quest/types';
import { authDataService } from '@/app/auth/services';
import { AuthLogInReqBodyDto, JwtDto } from '@/app/auth/services/auth-data/dto';
import { useRouter } from 'next/navigation';
import { dashboardUrl } from '@/app/dashboard/constants';

/** User login */
export function useLogin(): UseMutationResult<
  JwtDto,
  ApiErrorRes,
  AuthLogInReqBodyDto
> {
  const router = useRouter();

  const mutation = useMutation<JwtDto, ApiErrorRes, AuthLogInReqBodyDto>({
    mutationFn: (user: AuthLogInReqBodyDto) =>
      authDataService.login({ body: user }),
    cacheTime: 0,
    onSuccess: () => {
      router.push(dashboardUrl);
    },
  });

  return mutation;
}
