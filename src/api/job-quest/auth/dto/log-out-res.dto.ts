import { z } from 'zod';

export const AuthLogOutResDto = z.boolean();
export type AuthLogOutResDtoSchema = z.input<typeof AuthLogOutResDto>;
export type AuthLogOutResDto = z.output<typeof AuthLogOutResDto>;
