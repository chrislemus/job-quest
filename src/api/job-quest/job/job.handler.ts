import { rest } from '@tests/server';
import { jobQuestApi } from '@api/job-quest';
import { jobQuestApiUrls } from '@api/job-quest/job-quest-api-urls.const';
import { jobMocks } from './job.mocks';

export const jobServiceHandlers = [
  rest.get(jobQuestApiUrls.job.root, (_req, res, ctx) => {
    const data: Awaited<ReturnType<typeof jobQuestApi.job.getAll>> = {
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
