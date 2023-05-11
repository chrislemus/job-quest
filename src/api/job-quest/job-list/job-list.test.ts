import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { jobListService } from './job-list.service';
import { rest } from 'msw';
import { jobQuestApiUrls } from '@/api/job-quest/job-quest-api-urls.const';
import { server } from '@/tests/server';
import { JobListPageRes } from '@/api/job-quest/job-list/dto';

test('contains valid global server handlers', async () => {
  const res = await jobListService.getAll();
  const jobList = plainToInstance(JobListPageRes, res);
  await validateOrReject(jobList);
});

test('validates response data', async () => {
  // invalid response data
  const data = {
    data: [{ name: 'hi' }],
    pageInfo: {},
  };

  server.use(
    rest.get(jobQuestApiUrls.jobList.root, (_req, res, ctx) =>
      res(ctx.json(data))
    )
  );

  try {
    await jobListService.getAll();
  } catch (errors) {
    expect(errors).toHaveLength(2);
  }
});
