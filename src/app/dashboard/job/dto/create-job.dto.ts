import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
  ValidationArguments,
  ValidateIf,
} from 'class-validator';
import { JobEntity } from '@/api/job-quest/job/job.entity';

/**
 * Parameters for assigning job list to job
 * - only one property must be defined
 */
export class JobListDto {
  @ValidateIf((obj: JobListDto) => {
    const keys = Object.keys(obj);
    const valueCountNotInRange = !valueCountInRange(obj);
    const propValueProvided = keys.includes('id');
    return propValueProvided || valueCountNotInRange;
  })
  @IsNumber(
    {},
    {
      message: ({ object, property }: ValidationArguments) => {
        const count = Object.keys(object)?.length;
        const overRange = count > 1;
        const belowRange = count < 1;

        // global class validation
        if (overRange || belowRange) {
          return overRange ? overRangeErrorMsg : belowRangeErrorMsg;
        } else {
          return `${property} must be a number conforming to the specified constraints`;
        }
      },
    }
  )
  id?: number;

  @ValidateIf((obj: JobListDto) => valueCountInRange(obj))
  @IsNumber()
  @IsOptional()
  beforeJobId?: number;

  @ValidateIf((obj: JobListDto) => valueCountInRange(obj))
  @IsNumber()
  @IsOptional()
  afterJobId?: number;
}

/**
 * Request body data transfer object for creating a Job.
 */
export class CreateJobDto
  implements Omit<JobEntity, 'id' | 'userId' | 'jobListId' | 'jobListRank'>
{
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

  /** Job list data */
  @ValidateNested()
  jobList: JobListDto;
}

export const overRangeErrorMsg =
  'Job list should have at most one property defined';
export const belowRangeErrorMsg =
  'Job list should have at least one property defined';

function valueCountInRange(obj: JobListDto) {
  const keys = Object.keys(obj);
  JobListDto;
  const count = keys.length;
  return count == 1;
}
