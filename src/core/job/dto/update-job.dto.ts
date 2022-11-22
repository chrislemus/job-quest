import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateJobDto } from './create-job.dto';

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
  /**
   * Job List ID belonging to this Job
   */
  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  jobListId?: number;
}
