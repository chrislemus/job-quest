import { jobMocks } from './mocks';
import { jobDataApiUrlConstant } from './job-data-api-url.constant';
import { http, HttpResponse } from 'msw';
import { GetAllJobsResBodyDto, JobDto } from './dto';

export const jobDataServiceHandlers = [
  http.get<never, never, GetAllJobsResBodyDto>(
    jobDataApiUrlConstant.root,
    () => {
      const data = {
        items: jobMocks,
        pageInfo: {
          currentPage: 1,
          currentPageCount: jobMocks.length,
          currentPageSize: jobMocks.length,
        },
      };
      return HttpResponse.json(data);
    }
  ),

  http.get<{ jobId: string }, never, JobDto>(
    `${jobDataApiUrlConstant.root}/:jobId`,
    (info) => {
      const { jobId } = info.params;
      const job = jobMocks.find((job) => job.id === jobId);

      if (job) return HttpResponse.json(job);
      return HttpResponse.json(null, { status: 404 });
    }
  ),
];
