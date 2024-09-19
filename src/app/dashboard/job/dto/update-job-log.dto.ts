import { z } from 'zod';

export const UpdateJobLogDto = z.object({
  content: z.string().min(1),
});

export type UpdateJobLogDto = z.output<typeof UpdateJobLogDto>;
export type UpdateJobLogDtoInput = z.input<typeof UpdateJobLogDto>;
