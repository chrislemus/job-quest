import { z } from 'zod';

export const UserProfileDto = z.object({
  id: z.string().uuid(),
  email: z.string().min(1),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
});
export type UserProfileDto = z.output<typeof UserProfileDto>;
export type UserProfileDtoInput = z.input<typeof UserProfileDto>;
