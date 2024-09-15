import { jobQuestApiConfig } from '@/core/configs';

const url = jobQuestApiConfig.createUrl;

export const jobLogDataApiUrlConstant = {
  root: url('/job-log'),
  update: (id: string) => url(`/job-log/${id}`),
  delete: (id: string) => url(`/job-log/${id}`),
};
