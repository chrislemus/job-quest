import {
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationOptions,
  registerDecorator,
  IsEnum,
} from 'class-validator';
import { JobEntity } from '@/api/job-quest/job/job.entity';

const propNames = {
  id: 'id',
  beforeJobId: 'beforeJobId',
  afterJobId: 'afterJobId',
} as const;

@ValidatorConstraint({ name: 'jobListProperty', async: false })
export class JobListPropertyConstraint implements ValidatorConstraintInterface {
  validate(_value: any, args: ValidationArguments) {
    const validPropNames = Object.values(propNames);
    const queryPropNames = Object.keys(args.object);
    const currPropName = args.property;

    if (!validPropNames.includes(currPropName as any)) return false; // invalid property name
    if (queryPropNames.length > 1) return false;

    return true;
  }

  defaultMessage(args: ValidationArguments) {
    const validPropNames = Object.values(propNames);
    const queryPropNames = Object.keys(args.object);
    const currPropName = args.property;

    if (queryPropNames.length > 1) {
      const validPropNamesStr = validPropNames.join(', ');
      return `${currPropName}: only one property must be defined: ${validPropNamesStr}`;
    }
    return `${currPropName}: invalid property name.`;
  }
}

export function JobListProperty(validationOptions?: ValidationOptions) {
  return function (object: Record<any, any>, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: JobListPropertyConstraint,
    });
  };
}

export enum JobListRankPlacementEnum {
  TOP = 'top',
  BOTTOM = 'bottom',
}

export class JobListRankDto {
  @IsString()
  rank: string;

  @IsOptional()
  @IsEnum(JobListRankPlacementEnum)
  placement?: JobListRankPlacementEnum;
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

  /** Job list id */
  @IsString()
  jobListId: string;

  @IsOptional()
  @ValidateNested()
  jobListRank: JobListRankDto;
}
