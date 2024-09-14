import { createPageResBody } from '@/shared/dto';
import { JobDto } from './job.dto';
import { z } from 'zod';

export const GetAllJobsResBodyDto = createPageResBody(JobDto);
export type GetAllJobsResBodyDtoInput = z.input<typeof GetAllJobsResBodyDto>;
export type GetAllJobsResBodyDto = z.output<typeof GetAllJobsResBodyDto>;

const GetAllJobsReqQueryParamsDto = z.object({
  jobListId: z.string().optional(),
});
export type GetAllJobsReqQueryParamsDtoInput = z.input<
  typeof GetAllJobsReqQueryParamsDto
>;
export type GetAllJobsReqQueryParamsDto = z.output<
  typeof GetAllJobsReqQueryParamsDto
>;

export const GetAllJobsReqConfigDto = z.object({
  queryParams: GetAllJobsReqQueryParamsDto.optional(),
});
export type GetAllJobsReqConfigDtoInput = z.input<
  typeof GetAllJobsReqConfigDto
>;
export type GetAllJobsReqConfigDto = z.output<typeof GetAllJobsReqConfigDto>;
