import { rest } from '@/tests/server';
import { jobLogMocks } from '@/app/dashboard/job-log/services/job-log-data/mocks/job-log.mock';
import { jobQuestApi } from '@/api/job-quest';
import { jobLogDataApiUrlConstant } from './job-log-data-api-url.constant';

export const jobLogServiceHandlers = [
  rest.get(jobLogDataApiUrlConstant.root, (req, res, ctx) => {
    let jobId = req.params.jobId;
    let jobLogs = jobLogMocks;
    if (jobId) {
      if (Array.isArray(jobId)) {
        jobLogs = jobLogs.filter((j) => jobId.includes(j.jobId));
      } else {
        jobLogs = jobLogs.filter((j) => j.jobId === jobId);
      }
    }

    const data: Awaited<ReturnType<typeof jobQuestApi.jobLog.getAll>> = {
      items: jobLogs,
      pageInfo: {
        currentPage: 1,
        currentPageCount: jobLogMocks.length,
        currentPageSize: jobLogMocks.length,
      },
    };
    return res(ctx.json(data));
  }),
];
