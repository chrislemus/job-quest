import { MinLength } from 'class-validator';

export class CreateJobLogDto {
  jobId: number;
  @MinLength(1)
  content: string;
}
