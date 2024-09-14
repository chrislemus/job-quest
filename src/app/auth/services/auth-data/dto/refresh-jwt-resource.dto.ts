import { JwtDto } from '@/app/auth/services/auth-data/dto';
import { z } from 'zod';

export type AuthRefreshJwtResBodyDto = z.output<
  typeof AuthRefreshJwtResBodyDto
>;
export const AuthRefreshJwtResBodyDto = JwtDto;
