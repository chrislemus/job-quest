import { jobListMocks } from './mocks';
import { jobDataApiUrlConstant } from './job-list-data-api-url.constant';
import { http, HttpResponse } from 'msw';
import { GetAllJobListResBodyDto } from './dto';

export const jobListServiceHandlers = [
  http.get<never, never, GetAllJobListResBodyDto>(
    jobDataApiUrlConstant.root,
    () => {
      const data = {
        items: jobListMocks,
        pageInfo: {
          currentPage: 1,
          currentPageCount: jobListMocks.length,
          currentPageSize: jobListMocks.length,
        },
      };
      return HttpResponse.json(data);
    }
  ),
];
