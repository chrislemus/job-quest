import { JwtDto } from '@/app/auth/services/auth-data/dto';
import { z } from 'zod';

export type AuthSignUpResBodyDto = z.output<typeof AuthSignUpResBodyDto>;
export const AuthSignUpResBodyDto = JwtDto;

export type AuthSignupReqBodyDto = z.output<typeof AuthSignupReqBodyDto>;
export const AuthSignupReqBodyDto = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
});

export type AuthSignUpReqConfigDto = z.output<typeof AuthSignUpReqConfigDto>;
export const AuthSignUpReqConfigDto = z.object({
  body: AuthSignupReqBodyDto,
});
