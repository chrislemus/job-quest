import { jobService } from '@/api/job-quest/job/job.service';

const pk = 'job' as const;
export const jobQueryKey = {
  pk: [pk] as const,
  detail: (jobId: string) => [pk, { jobId }] as const,
  all: (filters: Parameters<typeof jobService.getAll>[0] = {}) => {
    return [pk, { ...filters }] as const;
  },
};
