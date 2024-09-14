import { rest } from '@/tests/server';
import { jobQuestApi } from '@/api/job-quest';
import { jobListMocks } from './mocks';
import { jobDataApiUrlConstant } from './job-list-data-api-url.constant';

export const jobListServiceHandlers = [
  rest.get(jobDataApiUrlConstant.root, (_req, res, ctx) => {
    const data: Awaited<ReturnType<typeof jobQuestApi.jobList.getAll>> = {
      items: jobListMocks,
      pageInfo: {
        currentPage: 1,
        currentPageCount: jobListMocks.length,
        currentPageSize: jobListMocks.length,
      },
    };
    return res(ctx.json(data));
  }),
];
