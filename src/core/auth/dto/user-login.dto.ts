import { IsEmail, IsString, MinLength } from 'class-validator';

export class UserLogin {
  @IsEmail()
  email: string;

  @MinLength(1)
  @IsString()
  password: string;
}
