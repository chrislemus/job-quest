import { z } from 'zod';
import { createPageResBody } from '@/shared/dto';
import { JobRankDto } from './job.dto';

export const GetAllJobRanksResBodyDto = createPageResBody(JobRankDto);
export type GetAllJobRanksResBodyDtoInput = z.input<
  typeof GetAllJobRanksResBodyDto
>;
export type GetAllJobRanksResBodyDto = z.output<
  typeof GetAllJobRanksResBodyDto
>;

const GetAllJobRanksReqQueryParamsDto = z.object({
  jobListId: z.string(),
});
export type GetAllJobRanksReqQueryParamsDtoInput = z.input<
  typeof GetAllJobRanksReqQueryParamsDto
>;
export type GetAllJobRanksReqQueryParamsDto = z.output<
  typeof GetAllJobRanksReqQueryParamsDto
>;

export const GetAllJobRanksReqConfigDto = z.object({
  queryParams: GetAllJobRanksReqQueryParamsDto,
});
export type GetAllJobRanksReqConfigDtoInput = z.input<
  typeof GetAllJobRanksReqConfigDto
>;
export type GetAllJobRanksReqConfigDto = z.output<
  typeof GetAllJobRanksReqConfigDto
>;
