import { Type } from 'class-transformer';
import { ValidateNested, IsNotEmpty } from 'class-validator';
import { JobLogEntity } from '@/api/job-quest/job-log/job-log.entity';
import { ApiPageRes } from '@/api/job-quest/dto/api-page-res.dto';

export class JobLogPageRes extends ApiPageRes<JobLogEntity> {
  @Type(() => JobLogEntity)
  @ValidateNested({ each: true })
  @IsNotEmpty()
  data: JobLogEntity[];
}
