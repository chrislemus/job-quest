import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { jobDataService } from './job.service';
import { rest } from 'msw';
import { jobQuestApiUrls } from '@/api/job-quest/job-quest-api-urls.const';
import { server } from '@/tests/server';
import { JobPageRes } from '@/app/dashboard/job/services/job-data/dto';

test('contains valid global server handlers', async () => {
  const res = await jobDataService.getAll();
  const mockedJobs = plainToInstance(JobPageRes, res);
  await validateOrReject(mockedJobs);
});

test('validates response data', async () => {
  // invalid response data
  const data = {
    data: [{}],
    pageInfo: {},
  };

  server.use(
    rest.get(jobQuestApiUrls.job.root, (_req, res, ctx) => res(ctx.json(data)))
  );

  try {
    await jobDataService.getAll();
  } catch (errors) {
    expect(errors).toHaveLength(2);
  }
});
