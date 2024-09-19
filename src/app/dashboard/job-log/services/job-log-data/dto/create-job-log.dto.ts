import { z } from 'zod';

export const CreateJobLogDto = z.object({
  jobId: z.string().min(1),
  content: z.string().min(1),
});

export type CreateJobLogDto = z.output<typeof CreateJobLogDto>;
export type CreateJobLogDtoInput = z.input<typeof CreateJobLogDto>;
