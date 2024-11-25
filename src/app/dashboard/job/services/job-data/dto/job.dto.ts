import { JobListItemDto } from '@/app/dashboard/job-list/services';
import { z } from 'zod';

/** for optimistic UI updates only */
export const jobRankUITempDto = z.object({
  rank: z.string().min(1),
  placement: z.enum(['top', 'bottom']).optional(),
});

export type JobDtoInput = z.input<typeof JobDto>;
export type JobDto = z.output<typeof JobDto>;
export const JobDto = z.object({
  id: z.string().uuid(),
  title: z.string().min(1, 'title should not be empty'),
  company: z.string().min(1, 'company should not be empty'),
  location: z.string().optional(),
  url: z.string().optional(),
  salary: z.string().optional(),
  description: z.string().optional(),
  color: z.string().optional(),
  jobListId: JobListItemDto.shape.id,
  jobRank: z.string().min(1),
  userId: z.string().uuid(),
  /** for optimistic UI updates only */
  jobRankTemp: jobRankUITempDto.optional(),
});

export type JobRankDtoInput = z.input<typeof JobRankDto>;
export type JobRankDto = z.output<typeof JobRankDto>;
export const JobRankDto = JobDto.pick({
  jobRank: true,
  jobListId: true,
}).extend({
  jobId: z.string().uuid(),
});
