import { jobListDataService } from '../../app/dashboard/job-list/services/job-list-data/job-list-data.service';
import { jobLogService } from '../../app/dashboard/job-log/services/job-log-data/job-log-data.service';
import { jobDataService } from '../../app/dashboard/job/services/job-data/job-data.service';
import { userService } from '../../app/user/services/user-data/user.service';

export const jobQuestApi = {
  job: jobDataService,
  jobList: jobListDataService,
  jobLog: jobLogService,
  user: userService,
};
