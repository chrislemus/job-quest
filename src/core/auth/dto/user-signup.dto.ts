import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UserSignUp {
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
