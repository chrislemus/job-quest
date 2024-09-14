import { z } from 'zod';

export type JwtDto = z.output<typeof JwtDto>;
export const JwtDto = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
});
