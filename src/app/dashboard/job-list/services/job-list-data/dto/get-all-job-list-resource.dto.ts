import { z } from 'zod';
import { createPageResBody } from '@/shared/dto';
import { JobListItemDto } from './job-list-item.dto';

export const GetAllJobListResBodyDto = createPageResBody(JobListItemDto);
export type GetAllJobListResBodyDtoInput = z.input<
  typeof GetAllJobListResBodyDto
>;
export type GetAllJobListResBodyDto = z.output<typeof GetAllJobListResBodyDto>;
