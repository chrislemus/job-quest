import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { PageInfo } from './page-info.dto';

export class ApiPageRes<Data extends any> {
  data: Data[];

  @Type(() => PageInfo)
  @ValidateNested()
  pageInfo: PageInfo;
}
