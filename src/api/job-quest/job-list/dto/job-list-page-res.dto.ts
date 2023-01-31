import { Type } from 'class-transformer';
import { ValidateNested, IsNotEmpty } from 'class-validator';
import { JobListEntity } from '@api/job-quest/job-list/job-list.entity';
import { ApiPageRes } from '@api/job-quest/dto/api-page-res.dto';

export class JobListPageRes extends ApiPageRes<JobListEntity> {
  @Type(() => JobListEntity)
  @ValidateNested({ each: true })
  @IsNotEmpty()
  data: JobListEntity[];
}
