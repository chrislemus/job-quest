import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { ApiOkRes } from '@/api/job-quest/types';

export class AuthLogOutRes implements ApiOkRes<boolean> {
  @Type(() => Boolean)
  @IsNotEmpty()
  data: boolean;
}
