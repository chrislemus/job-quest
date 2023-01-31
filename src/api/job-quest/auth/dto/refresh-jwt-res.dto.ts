import { Type } from 'class-transformer';
import { JWT } from '@api/job-quest/auth/dto';
import { ValidateNested, IsNotEmpty } from 'class-validator';
import { ApiOkRes } from '@api/job-quest/types';

export class AuthRefreshJwtRes implements ApiOkRes<JWT> {
  @Type(() => JWT)
  @IsNotEmpty()
  @ValidateNested()
  data: JWT;
}
