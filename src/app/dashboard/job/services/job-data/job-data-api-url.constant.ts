import { jobQuestApiConfig } from '@/core/configs';

const url = jobQuestApiConfig.createUrl;

export const jobDataApiUrlConstant = {
  root: url('/job'),
  jobRanks: url('/job/job-rank'),
  findById: (id: string) => url(`/job/${id}`),
  update: (id: string) => url(`/job/${id}`),
  delete: (id: string) => url(`/job/${id}`),
};
