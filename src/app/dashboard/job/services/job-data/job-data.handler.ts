import { rest } from '@/tests/server';
import { jobQuestApi } from '@/api/job-quest';
import { jobMocks } from './mocks';
import { jobDataApiUrlConstant } from './job-data-api-url.constant';

export const jobDataServiceHandlers = [
  rest.get(jobDataApiUrlConstant.root, (_req, res, ctx) => {
    const data: Awaited<ReturnType<typeof jobQuestApi.job.getAll>> = {
      items: jobMocks,
      pageInfo: {
        currentPage: 1,
        currentPageCount: jobMocks.length,
        currentPageSize: jobMocks.length,
      },
    };
    return res(ctx.json(data));
  }),

  rest.get(`${jobDataApiUrlConstant.root}/:jobId`, (req, res, ctx) => {
    const { jobId } = req.params;
    const job = jobMocks.find((job) => job.id === jobId);

    if (job) {
      return res(ctx.status(200), ctx.json(job));
    }

    return res(ctx.status(401));
  }),
];
