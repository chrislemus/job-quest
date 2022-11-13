import { JobListEntity } from '@core/job/entities';
import { jobList } from './mocks.const';

function getAll() {
  return new Promise<JobListEntity[]>((resolve, _reject) => {
    resolve(jobList);
  });
}

export const jobListService = { getAll };
