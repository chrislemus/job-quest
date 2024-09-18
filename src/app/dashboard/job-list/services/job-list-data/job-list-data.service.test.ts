import { jobListDataService } from './job-list-data.service';
import { http, HttpResponse } from 'msw';
import { server } from '@/tests/server';
import { jobDataApiUrlConstant } from './job-list-data-api-url.constant';
import { GetAllJobListResBodyDto } from './dto';

test('contains valid global server handlers', async () => {
  const res = await jobListDataService.getAll();
  GetAllJobListResBodyDto.parse(res);
});

test('validates response data', async () => {
  // invalid response data
  const data = {
    items: [{ name: 'hi' }],
    pageInfo: {},
  };

  server.use(
    http.get(jobDataApiUrlConstant.root, () => HttpResponse.json(data))
  );

  try {
    await jobListDataService.getAll();
    expect(true).toBe(false); // should not reach here
  } catch (errors) {
    expect(errors).toBeTruthy();
  }
});
