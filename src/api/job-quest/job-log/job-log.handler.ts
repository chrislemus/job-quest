import { rest } from 'msw';
import { jobQuestApiUrls } from '@api/job-quest/job-quest-api-urls.const';
import { jobLogMocks } from '@api/job-quest/job-log/job-log.mocks';
import { jobQuestApi } from '@api/job-quest';

export const jobLogServiceHandlers = [
  rest.get(jobQuestApiUrls.jobLog.root, (req, res, ctx) => {
    let jobId = req.params.jobId;
    let jobLogs = jobLogMocks;
    if (jobId) {
      if (Array.isArray(jobId)) {
        const jobIds = jobId.map((j) => parseInt(j));
        jobLogs = jobLogs.filter((j) => jobIds.includes(j.jobId));
      } else {
        jobLogs = jobLogs.filter((j) => j.jobId === parseInt(jobId as string));
      }
    }

    const data: Awaited<ReturnType<typeof jobQuestApi.jobLog.getAll>> = {
      data: jobLogs,
      pageInfo: {
        currentPage: 1,
        currentPageCount: jobLogMocks.length,
        currentPageSize: jobLogMocks.length,
      },
    };
    return res(ctx.json(data));
  }),
];
