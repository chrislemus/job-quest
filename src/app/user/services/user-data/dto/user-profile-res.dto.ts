import { IsString } from 'class-validator';

export class UserProfile {
  @IsString()
  id: string;

  @IsString()
  email: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;
}

export class UserProfileRes extends UserProfile {}
