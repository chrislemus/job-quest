import { z } from 'zod';

export const UserSignUpDto = z.object({
  firstName: z.string().min(1, { message: 'should not be empty' }),
  lastName: z.string().min(1, { message: 'should not be empty' }),
  email: z.string().email({ message: 'email must be an email' }),
  password: z.string().min(1, { message: 'password must be longer' }),
});

export type UserSignUpDto = z.output<typeof UserSignUpDto>;
export type UserSignUpDtoInput = z.input<typeof UserSignUpDto>;
