import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AddJobDto {
  @IsString()
  @IsNotEmpty()
  company: string;
  @IsString()
  @IsNotEmpty()
  title: string;
  @IsNumber()
  @IsNotEmpty()
  jobListId: number;
}
