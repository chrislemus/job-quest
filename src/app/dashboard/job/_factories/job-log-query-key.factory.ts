import { jobLogService } from '../_services';

const _base = ['job'] as const;

// TODO: create generic pagination filter util function/type
function all(jobId: number) {
  return [..._base, 'all', { jobId }] as const;
}

export const jobLogQueryKeyFactory = { _base, all };
