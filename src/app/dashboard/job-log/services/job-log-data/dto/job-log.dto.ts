import { z } from 'zod';

export const JobLogItemDto = z.object({
  id: z.string(),
  jobId: z.string(),
  content: z.string(),
  createdAt: z.string().date(),
  updatedAt: z.string().date(),
});

export type JobLogItemDtoInput = z.input<typeof JobLogItemDto>;
export type JobLogItemDto = z.output<typeof JobLogItemDto>;
