import { JobLogItemDto } from '@/app/dashboard/job-log/services/job-log-data/dto/job-log.dto';
import { createPageResBody } from '@/shared/dto';
import { z } from 'zod';

export const JobLogPageResBodyDto = createPageResBody(JobLogItemDto);
export type JobLogPageResBodyDto = z.output<typeof JobLogPageResBodyDto>;
export type JobLogPageResBodyDtoInput = z.input<typeof JobLogPageResBodyDto>;
