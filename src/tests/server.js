import { setupServer } from 'msw/node';
import { jobListServiceHandlers } from '@app/dashboard/job-list/_services/job-list.handler';
import { jobLogServiceHandlers } from '@app/dashboard/job-log/_services/job-log.handler';
import { jobServiceHandlers } from '@app/dashboard/job/_services/job.handler';

export const handlers = [
  ...jobServiceHandlers,
  ...jobLogServiceHandlers,
  ...jobListServiceHandlers,
];

// This configures a request mocking server with the given request handlers.
export const server = setupServer(...handlers);
