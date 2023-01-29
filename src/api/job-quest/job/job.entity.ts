import { IsNumber, IsOptional, IsString } from 'class-validator';

/** Job Entity */
export class JobEntity {
  @IsNumber()
  id: number;

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

  @IsNumber()
  jobListId: number;

  @IsNumber()
  userId: number;
}
