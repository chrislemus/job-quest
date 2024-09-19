import { JobDto } from '@/app/dashboard/job/services';
import { z } from 'zod';

export const JobLogItemDto = z.object({
  id: z.string().uuid(),
  jobId: JobDto.shape.id,
  content: z.string().min(1),
  /** epoch time */
  createdAt: z.number(),
  /** epoch time */
  updatedAt: z.number(),
});

export type JobLogItemDtoInput = z.input<typeof JobLogItemDto>;
export type JobLogItemDto = z.output<typeof JobLogItemDto>;
