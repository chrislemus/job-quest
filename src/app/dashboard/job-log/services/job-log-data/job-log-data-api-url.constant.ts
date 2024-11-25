import { jobQuestApiConfig } from '@/core/configs';

const url = jobQuestApiConfig.createUrl;

export const jobLogDataApiUrlConstant = {
  root: url('/job-log'),
  update: (jobLogId: string, jobId: string) =>
    url(`/job-log/${jobLogId}?jobId=${jobId}`),
  delete: (obLogId: string, jobId: string) =>
    url(`/job-log/${obLogId}?jobId=${jobId}`),
};
