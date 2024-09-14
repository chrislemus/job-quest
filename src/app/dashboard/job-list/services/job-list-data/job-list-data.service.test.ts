import { jobListDataService } from './job-list-data.service';
import { rest } from 'msw';
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
    rest.get(jobDataApiUrlConstant.root, (_req, res, ctx) =>
      res(ctx.json(data))
    )
  );

  try {
    await jobListDataService.getAll();
    expect(true).toBe(false); // should not reach here
  } catch (errors) {
    expect(errors).toBeTruthy();
  }
});
