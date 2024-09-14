import { jobDataService } from '@/app/dashboard/job/services/job-data/job.service';

const pk = 'job' as const;
export const jobQueryKey = {
  pk: [pk] as const,
  detail: (jobId: string) => [pk, { jobId }] as const,
  all: (filters: Parameters<typeof jobDataService.getAll>[0] = {}) => {
    return [pk, { ...filters }] as const;
  },
};
