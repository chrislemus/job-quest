import { z } from 'zod';

/** for optimistic UI updates only */
export const JobListRanUITempDto = z.object({
  rank: z.string(),
  placement: z.enum(['top', 'bottom']).optional(),
});

export type JobDtoInput = z.input<typeof JobDto>;
export type JobDto = z.output<typeof JobDto>;
export const JobDto = z.object({
  id: z.string(),
  title: z.string(),
  company: z.string(),
  location: z.string().optional(),
  url: z.string().optional(),
  salary: z.string().optional(),
  description: z.string().optional(),
  color: z.string().optional(),
  jobListId: z.string(),
  jobListRank: z.string(),
  userId: z.string(),
  /** for optimistic UI updates only */
  jobListRankTemp: JobListRanUITempDto.optional(),
});
