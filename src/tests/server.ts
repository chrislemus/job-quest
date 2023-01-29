import { setupServer } from 'msw/node';
import { jobServiceHandlers } from '@api/job-quest/job/job.handler';
import { jobLogServiceHandlers } from '@api/job-quest/job-log/job-log.handler';
import { jobListServiceHandlers } from '@api/job-quest/job-list/job-list.handler';

// This configures a request mocking server with the given request handlers.
export const server = setupServer(
  ...jobServiceHandlers,
  ...jobLogServiceHandlers,
  ...jobListServiceHandlers
);
