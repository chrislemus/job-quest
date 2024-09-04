import { IsDateString, IsString } from 'class-validator';

export class JobLogEntity {
  @IsString()
  id: string;

  @IsString()
  jobId: string;

  @IsString()
  content: string;

  @IsDateString()
  createdAt: Date;

  @IsDateString()
  updatedAt: Date;
}
