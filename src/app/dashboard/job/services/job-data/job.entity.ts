import { JobListRankDto } from '@/app/dashboard/job/dto';
import { IsOptional, IsString } from 'class-validator';

/** Job Entity */
export class JobEntity {
  @IsString()
  id: string;

  @IsString()
  title: string;

  @IsString()
  company: string;

  @IsOptional()
  @IsString()
  location?: string | null;

  @IsOptional()
  @IsString()
  url?: string | null;

  @IsOptional()
  @IsString()
  salary?: string | null;

  @IsOptional()
  @IsString()
  description?: string | null;

  @IsOptional()
  @IsString()
  color?: string | null;

  @IsString()
  jobListId: string;

  @IsString()
  jobListRank: string;

  /** for optimistic UI updates only */
  jobListRankTemp?: JobListRankDto;

  @IsString()
  userId: string;
}
