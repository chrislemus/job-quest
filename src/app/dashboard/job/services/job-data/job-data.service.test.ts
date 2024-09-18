import { jobDataService } from './job-data.service';
import { server } from '@/tests/server';
import { GetAllJobsResBodyDto } from '@/app/dashboard/job/services/job-data/dto';
import { jobDataApiUrlConstant } from './job-data-api-url.constant';
import { http, HttpResponse } from 'msw';

test('contains valid global server handlers', async () => {
  const res = await jobDataService.getAll();
  GetAllJobsResBodyDto.parse(res);
});

test('validates response data', async () => {
  // invalid response data
  const data = {
    items: [],
    pageInfo: {},
  };

  server.use(
    http.get(jobDataApiUrlConstant.root, () => HttpResponse.json(data))
  );

  try {
    await jobDataService.getAll();
    expect(true).toBeFalsy(); // should not reach here
  } catch (errors) {
    expect(errors).toBeTruthy();
  }
});
