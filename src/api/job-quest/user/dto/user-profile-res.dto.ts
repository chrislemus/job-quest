import { IsNumber, IsString } from 'class-validator';
import { ApiOkRes } from '@/api/job-quest/types';
import { Type } from 'class-transformer';
import { ValidateNested, IsNotEmpty } from 'class-validator';

export class UserProfile {
  @IsNumber()
  id: number;

  @IsString()
  email: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;
}

export class UserProfileRes implements ApiOkRes<UserProfile> {
  @Type(() => UserProfile)
  @IsNotEmpty()
  @ValidateNested()
  data: UserProfile;
}
