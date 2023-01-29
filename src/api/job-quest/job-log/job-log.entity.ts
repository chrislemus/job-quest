import { IsDateString, IsNumber, IsString } from 'class-validator';

export class JobLogEntity {
  @IsNumber()
  id: number;

  @IsNumber()
  jobId: number;

  @IsString()
  content: string;

  @IsDateString()
  createdAt: Date;

  @IsDateString()
  updatedAt: Date;
}
