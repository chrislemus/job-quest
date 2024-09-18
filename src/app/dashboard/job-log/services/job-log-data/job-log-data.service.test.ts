import { jobLogService } from './job-log-data.service';
import { http, HttpResponse } from 'msw';
import { server } from '@/tests/server';
import { JobLogPageResBodyDto } from '@/app/dashboard/job-log/services/job-log-data/dto';
import { jobLogMocks } from './mocks/job-log.mock';
import { jobLogDataApiUrlConstant } from './job-log-data-api-url.constant';

test('contains valid global server handlers', async () => {
  const jobId = jobLogMocks[0].jobId;
  const res = await jobLogService.getAll(jobId);
  JobLogPageResBodyDto.parse(res);
});

test('returns jobLogs by jobId param', async () => {
  for (let i = 0; i < 2; i++) {
    const jobId = jobLogMocks[i].jobId;
    const dataLength = jobLogMocks.filter((j) => (j.jobId = jobId)).length;
    const res = await jobLogService.getAll(jobId);
    expect(res.items).toHaveLength(dataLength);
  }
});

test('validates response data', async () => {
  // invalid response data
  const data = {
    data: [{ n: '' }],
    pageInfo: {},
  };

  server.use(
    http.get(jobLogDataApiUrlConstant.root, () => HttpResponse.json(data))
  );

  try {
    await jobLogService.getAll(jobLogMocks[0].jobId);
    expect(true).toBeFalsy(); // should not reach here
  } catch (errors) {
    expect(errors).toBeTruthy();
  }
});
