import { z } from 'zod';
import { CreateJobDto } from './create-job.dto';

export const UpdateJobDto = CreateJobDto.partial().refine(
  (data) => Object.keys(data).length > 0,
  {
    message: 'No data provided for update',
  }
);
export type UpdateJobDto = z.output<typeof UpdateJobDto>;
export type UpdateJobDtoInput = z.input<typeof UpdateJobDto>;
