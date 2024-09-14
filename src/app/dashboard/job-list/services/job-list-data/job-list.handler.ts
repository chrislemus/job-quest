import { rest } from '@/tests/server';
import { jobQuestApiUrls } from '@/api/job-quest/job-quest-api-urls.const';
import { jobListMocks } from '@/app/dashboard/job-list/services/job-list-data/job-list.mocks';
import { jobQuestApi } from '@/api/job-quest';

export const jobListServiceHandlers = [
  rest.get(jobQuestApiUrls.jobList.root, (_req, res, ctx) => {
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
