import { JwtDto } from '@/app/auth/services/auth-data/dto';
import { z } from 'zod';

export type AuthLogInReqBodyDto = z.output<typeof AuthLogInReqBodyDto>;
const AuthLogInReqBodyDto = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type AuthLogInResBodyDto = z.output<typeof AuthLogInResBodyDto>;
export const AuthLogInResBodyDto = JwtDto;

export type AuthLogInReqConfigDto = z.output<typeof AuthLogInReqConfigDto>;
export const AuthLogInReqConfigDto = z.object({
  body: AuthLogInReqBodyDto,
});
