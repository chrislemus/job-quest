import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { jobServiceHandlers } from '@api/job-quest/job/job.handler';
import { jobLogServiceHandlers } from '@api/job-quest/job-log/job-log.handler';
import { jobListServiceHandlers } from '@api/job-quest/job-list/job-list.handler';
import { authServiceHandlers } from '@api/job-quest/auth/auth.handler';
import { userServiceHandlers } from '@api/job-quest/user/user.handler';

// This configures a request mocking server with the given request handlers.
const server = setupServer(
  ...userServiceHandlers,
  ...jobServiceHandlers,
  ...jobLogServiceHandlers,
  ...jobListServiceHandlers,
  ...authServiceHandlers
);

export { rest, server };
