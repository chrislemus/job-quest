import { jobDataService } from './job-data.service';
import { rest } from 'msw';
import { server } from '@/tests/server';
import { GetAllJobsResBodyDto } from '@/app/dashboard/job/services/job-data/dto';
import { jobDataApiUrlConstant } from './job-data-api-url.constant';

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
    rest.get(jobDataApiUrlConstant.root, (_req, res, ctx) =>
      res(ctx.json(data))
    )
  );

  try {
    await jobDataService.getAll();
    expect(true).toBeFalsy(); // should not reach here
  } catch (errors) {
    expect(errors).toBeTruthy();
  }
});
