import { IsNumber, IsString } from 'class-validator';

/** Job List Entity */
export class JobListEntity {
  @IsString()
  id: string;

  @IsString()
  label: string;

  @IsNumber()
  order: number;
}
