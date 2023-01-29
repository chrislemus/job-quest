import { jobQuestApiUrls } from '@common/api';
import { rest } from 'msw';
import { jobLogMocks } from '../_mocks';
import { jobLogService } from './job-log.service';

export const jobLogServiceHandlers = [
  rest.get(jobQuestApiUrls.jobLog.root, (_req, res, ctx) => {
    const data: Awaited<ReturnType<typeof jobLogService.getAll>> = {
      data: jobLogMocks,
      pageInfo: {
        currentPage: 1,
        currentPageCount: jobLogMocks.length,
        currentPageSize: jobLogMocks.length,
      },
    };
    return res(ctx.json(data));
  }),
];
