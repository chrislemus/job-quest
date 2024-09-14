import { jobListService } from '../../app/dashboard/job-list/services/job-list-data/job-list.service';
import { jobLogService } from '../../app/dashboard/job-log/services/job-log-data/job-log.service';
import { jobDataService } from '../../app/dashboard/job/services/job-data/job.service';
import { userService } from '../../app/user/services/user-data/user.service';

export const jobQuestApi = {
  job: jobDataService,
  jobList: jobListService,
  jobLog: jobLogService,
  user: userService,
};
