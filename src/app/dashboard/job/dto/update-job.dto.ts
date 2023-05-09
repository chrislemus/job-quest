import {
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateJobDto, JobListDto } from './create-job.dto';

/**
 * Request body Data transfer object for updating a Job.
 */
export class UpdateJobDto implements Partial<CreateJobDto> {
  /**
   * Job Title
   * @example 'Software Engineer'
   */
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  title?: string;
  /**
   * Job company
   * @example Acme
   */
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  company?: string;
  /**
   * Job Location
   * @example 'Raleigh, NC'
   */
  @IsOptional()
  @IsString()
  location?: string;
  /**
   * Job post URL
   */
  @IsOptional()
  @IsString()
  url?: string;
  /**
   * Job salary
   * @example 56k
   */
  @IsOptional()
  @IsString()
  salary?: string;
  /**
   * Job description
   */
  @IsOptional()
  @IsString()
  description?: string;
  /**
   * Hexadecimal color to be used in UI when displaying job content
   * @example #ffff
   */
  @IsOptional()
  @IsString()
  color?: string;

  /** Job list data */
  @ValidateNested()
  jobList: JobListDto;
}
