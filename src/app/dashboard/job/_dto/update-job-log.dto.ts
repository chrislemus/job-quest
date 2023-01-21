import { MinLength } from 'class-validator';

export class UpdateJobLogDto {
  @MinLength(1)
  content: string;
}
