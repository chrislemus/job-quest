import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { JobEntity } from '@api/job-quest/job/job.entity';
import { ApiPageRes } from '../../dto/api-page-res.dto';

export class JobPageRes extends ApiPageRes<JobEntity> {
  @Type(() => JobEntity)
  @ValidateNested()
  data: JobEntity[];
}