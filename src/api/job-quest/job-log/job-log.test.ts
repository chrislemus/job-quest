import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { jobLogService } from './job-log.service';
import { rest } from 'msw';
import { jobQuestApiUrls } from '@/api/job-quest/job-quest-api-urls.const';
import { server } from '@/tests/server';
import { JobLogPageRes } from '@/api/job-quest/job-log/dto';
import { jobLogMocks } from './job-log.mocks';

test('contains valid global server handlers', async () => {
  const jobId = jobLogMocks[0].jobId;
  const res = await jobLogService.getAll(jobId);
  const jobLog = plainToInstance(JobLogPageRes, res);
  await validateOrReject(jobLog);
});

test('returns jobLogs by jobId param', async () => {
  for (let i = 0; i < 2; i++) {
    const jobId = jobLogMocks[i].jobId;
    const dataLength = jobLogMocks.filter((j) => (j.jobId = jobId)).length;
    const res = await jobLogService.getAll(jobId);
    expect(res.data).toHaveLength(dataLength);
  }
});

test('validates response data', async () => {
  // invalid response data
  const data = {
    data: [{ n: '' }],
    pageInfo: {},
  };

  server.use(
    rest.get(jobQuestApiUrls.jobLog.root, (_req, res, ctx) =>
      res(ctx.json(data))
    )
  );

  try {
    await jobLogService.getAll(jobLogMocks[0].jobId);
  } catch (errors) {
    expect(errors).toHaveLength(2);
  }
});
