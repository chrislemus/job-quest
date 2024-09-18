import { z } from 'zod';

export const JobLogItemDto = z.object({
  id: z.string(),
  jobId: z.string(),
  content: z.string(),
  /** epoch time */
  createdAt: z.number(),
  /** epoch time */
  updatedAt: z.number(),
});

export type JobLogItemDtoInput = z.input<typeof JobLogItemDto>;
export type JobLogItemDto = z.output<typeof JobLogItemDto>;
