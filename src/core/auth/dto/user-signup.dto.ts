import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UserSignup {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  email: string;

  @MinLength(1)
  @IsString()
  password: string;
}
