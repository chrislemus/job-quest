import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { JobEntity } from '../entities';

export class CreateJobDto implements Omit<JobEntity, 'id' | 'userId'> {
  /**
   * Job Title
   * @example 'Software Engineer'
   */
  @IsString()
  @IsNotEmpty()
  title: string;
  /**
   * Job company
   * @example Acme
   */
  @IsString()
  @IsNotEmpty()
  company: string;
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
  @IsString()
  @IsOptional()
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
  @IsNumber()
  @IsNotEmpty()
  jobListId: number;
}
