import { jobQuestApiUrls } from '@common/api';
import { rest } from 'msw';
import { jobMocks } from '../_mocks';
import { jobService } from './job.service';

export const jobServiceHandlers = [
  rest.get(jobQuestApiUrls.job.root, (_req, res, ctx) => {
    const data: Awaited<ReturnType<typeof jobService.getAll>> = {
      data: jobMocks,
      pageInfo: {
        currentPage: 1,
        currentPageCount: jobMocks.length,
        currentPageSize: jobMocks.length,
      },
    };
    return res(ctx.json(data));
  }),
];
