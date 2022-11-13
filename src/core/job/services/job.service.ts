import { jobs as _jobs } from './mocks.const';
import { JobEntity } from '@core/job/entities';

function getAll(filters?: { jobListId: number }) {
  return new Promise<JobEntity[]>((resolve, _reject) => {
    let jobs = _jobs;
    if (filters?.jobListId) {
      jobs = jobs.filter((j) => j.jobListId === filters.jobListId);
    }

    resolve(jobs);
  });
}

export const jobService = { getAll };
