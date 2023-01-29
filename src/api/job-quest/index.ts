import { authService } from './auth/auth.service';
import { jobListService } from './job-list/job-list.service';
import { jobLogService } from './job-log/job-log.service';
import { jobService } from './job/job.service';
import { userService } from './user/user.service';

export const jobQuestApi = {
  auth: authService,
  job: jobService,
  jobList: jobListService,
  jobLog: jobLogService,
  user: userService,
};
