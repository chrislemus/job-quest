import { IsNumber, IsString } from 'class-validator';

/** Job List Entity */
export class JobListEntity {
  @IsNumber()
  id: number;

  @IsString()
  label: string;

  @IsNumber()
  order: number;
}
