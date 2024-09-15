import { z } from 'zod';

export const UserProfileDto = z.object({
  id: z.string(),
  email: z.string(),
  firstName: z.string(),
  lastName: z.string(),
});
export type UserProfileDto = z.output<typeof UserProfileDto>;
export type UserProfileDtoInput = z.input<typeof UserProfileDto>;
