import { z } from 'zod';
import { JobDto } from '../services';

export const JobListRankPlacementEnum = z.enum(['top', 'bottom']);
export type JobListRankPlacementEnum = z.infer<typeof JobListRankPlacementEnum>;

export const JobListRankDto = z.object({
  rank: z.string().min(1),
  placement: JobListRankPlacementEnum.optional(),
});
export type JobListRankDto = z.output<typeof JobListRankDto>;
export type JobListRankDtoInput = z.input<typeof JobListRankDto>;

export const CreateJobDto = JobDto.omit({
  id: true,
  userId: true,
  jobRank: true,
}).extend({
  jobRank: JobListRankDto.optional(),
});
export type CreateJobDto = z.output<typeof CreateJobDto>;
export type CreateJobDtoInput = z.input<typeof CreateJobDto>;
