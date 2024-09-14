import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { jobServiceHandlers } from '@/app/dashboard/job/services/job-data/job.handler';
import { jobLogServiceHandlers } from '@/app/dashboard/job-log/services/job-log-data/job-log.handler';
import { jobListServiceHandlers } from '@/app/dashboard/job-list/services/job-list-data/job-list.handler';
import { authDataServiceHandlers } from '@/app/auth/services/auth-data/auth-data.handler';
import { userServiceHandlers } from '@/app/user/services/user-data/user.handler';

// This configures a request mocking server with the given request handlers.
const server = setupServer(
  ...userServiceHandlers,
  ...jobServiceHandlers,
  ...jobLogServiceHandlers,
  ...jobListServiceHandlers,
  ...authDataServiceHandlers
);

export { rest, server };
