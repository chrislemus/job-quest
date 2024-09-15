import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { jobDataServiceHandlers } from '@/app/dashboard/job/services/job-data/job-data.handler';
import { jobLogServiceHandlers } from '@/app/dashboard/job-log/services/job-log-data/job-log-data.handler';
import { jobListServiceHandlers } from '@/app/dashboard/job-list/services/job-list-data/job-list-data.handler';
import { authDataServiceHandlers } from '@/app/auth/services/auth-data/auth-data.handler';
import { userServiceHandlers } from '@/app/user/services/user-data/user.handler';

// This configures a request mocking server with the given request handlers.
const server = setupServer(
  ...userServiceHandlers,
  ...jobDataServiceHandlers,
  ...jobLogServiceHandlers,
  ...jobListServiceHandlers,
  ...authDataServiceHandlers
);

export { rest, server };
