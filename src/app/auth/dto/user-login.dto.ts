import { z } from 'zod';
import { UserSignUpDto } from '.';

export const UserLoginDto = z.object({
  email: UserSignUpDto.shape.email,
  password: UserSignUpDto.shape.password,
});

export type UserLoginDto = z.output<typeof UserLoginDto>;
export type UserLoginDtoInput = z.input<typeof UserLoginDto>;
