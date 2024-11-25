import { jobDataService } from '@/app/dashboard/job/services/job-data/job-data.service';

const pk = 'job' as const;
export const jobQueryKey = {
  pk: [pk] as const,
  detail: (jobId: string) => [pk, { jobId }] as const,
  all: (filters: Parameters<typeof jobDataService.getAll>[0] = {}) => {
    return [pk, { ...filters }] as const;
  },
  allJobRanks: (
    filters: Parameters<typeof jobDataService.getAllJobRanks>[0]
  ) => {
    return [pk, 'ranks', { ...filters }] as const;
  },
};
