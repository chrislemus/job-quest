import { z } from 'zod';

export const JobListItemDto = z.object({
  id: z.string(),
  label: z.string(),
  order: z.number(),
});
export type JobListItemDtoInput = z.input<typeof JobListItemDto>;
export type JobListItemDto = z.output<typeof JobListItemDto>;
