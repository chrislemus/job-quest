import { rest } from '@tests/server';
import { jobQuestApi } from '@api/job-quest';
import { jobQuestApiUrls } from '@api/job-quest/job-quest-api-urls.const';
import { jobMocks } from './job.mocks';

jobQuestApi.job.findById;
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

  rest.get(`${jobQuestApiUrls.job.root}/:jobId`, (req, res, ctx) => {
    const { jobId } = req.params;
    const job = jobMocks.find((job) => job.id === +jobId);

    if (job) {
      const data: Awaited<ReturnType<typeof jobQuestApi.job.findById>> = {
        data: job,
      };
      return res(ctx.status(200), ctx.json(data));
    }

    return res(ctx.status(401));
  }),
];
