import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';
import { JobEntity, JobListEntity } from '../entities';

export class EditJobDto implements Omit<JobEntity, 'id'> {
  @IsString()
  title: string;

  @IsString()
  company: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  // @Transform
  @IsNumber({}, { message: 'must be a number' })
  salary?: number;

  @IsOptional()
  @IsString()
  url?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  backgroundColor: string;

  @IsNumber()
  jobListId: JobListEntity['id'];
}
