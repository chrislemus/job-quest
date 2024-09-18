import { jobLogMocks } from '@/app/dashboard/job-log/services/job-log-data/mocks/job-log.mock';
import { jobLogDataApiUrlConstant } from './job-log-data-api-url.constant';
import { http, HttpResponse } from 'msw';
import { JobLogPageResBodyDto } from './dto';

export const jobLogServiceHandlers = [
  http.get<{ jobId: string }, never, JobLogPageResBodyDto>(
    jobLogDataApiUrlConstant.root,
    (info) => {
      let { jobId } = info.params;
      let jobLogs = jobLogMocks;
      if (jobId) {
        if (Array.isArray(jobId)) {
          jobLogs = jobLogs.filter((j) => jobId.includes(j.jobId));
        } else {
          jobLogs = jobLogs.filter((j) => j.jobId === jobId);
        }
      }

      const data = {
        items: jobLogs,
        pageInfo: {
          currentPage: 1,
          currentPageCount: jobLogMocks.length,
          currentPageSize: jobLogMocks.length,
        },
      };
      return HttpResponse.json(data);
    }
  ),
];
