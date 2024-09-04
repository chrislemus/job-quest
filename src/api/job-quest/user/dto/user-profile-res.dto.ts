import { IsString } from 'class-validator';
import { ApiOkRes } from '@/api/job-quest/types';
import { Type } from 'class-transformer';
import { ValidateNested, IsNotEmpty } from 'class-validator';

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
