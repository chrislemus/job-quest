import { jobQuestApiUrls } from '@common/api';
import { rest } from 'msw';
import { jobListMocks } from '../_mocks';
import { jobListService } from './job-list.service';

export const jobListServiceHandlers = [
  rest.get(jobQuestApiUrls.jobList.root, (_req, res, ctx) => {
    const data: Awaited<ReturnType<typeof jobListService.getAll>> = {
      data: jobListMocks,
      pageInfo: {
        currentPage: 1,
        currentPageCount: jobListMocks.length,
        currentPageSize: jobListMocks.length,
      },
    };
    return res(ctx.json(data));
  }),
];
