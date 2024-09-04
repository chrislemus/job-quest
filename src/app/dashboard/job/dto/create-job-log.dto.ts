import { IsString, MinLength } from 'class-validator';

export class CreateJobLogDto {
  @IsString()
  jobId: string;
  @MinLength(1)
  content: string;
}
