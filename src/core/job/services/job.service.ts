import { jobs as _jobs } from './mocks.const';
import { JobEntity } from '@core/job/entities';
import { AddJobDto } from '../dto';

function getAll(filters?: { jobListId: number }) {
  return new Promise<JobEntity[]>((resolve, _reject) => {
    let jobs = _jobs;
    if (filters?.jobListId) {
      jobs = jobs.filter((j) => j.jobListId === filters.jobListId);
    }

    resolve(jobs);
  });
}

function addJob(job: AddJobDto) {
  return new Promise<AddJobDto>((resolve, _reject) => {
    const id = _jobs.length + 1;
    _jobs.push({ ...job, id, location: 'na' });
    resolve(job);
  });
}

export const jobService = { getAll, addJob };
