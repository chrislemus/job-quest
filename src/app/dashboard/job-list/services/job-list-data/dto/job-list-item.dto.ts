import { z } from 'zod';

export const JobListItemDto = z.object({
  id: z.string().uuid(),
  label: z.string().min(1),
  order: z.number().min(1),
});
export type JobListItemDtoInput = z.input<typeof JobListItemDto>;
export type JobListItemDto = z.output<typeof JobListItemDto>;
