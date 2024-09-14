let root = process.env.NEXT_PUBLIC_JOB_QUEST_API_ROOT_URL;
const url = (resource: string): string => `${root}${resource}`;

/**
 * Job Quest Api Urls
 */
export const jobQuestApiUrls = {
  root: root,
  user: { profile: url('/user/profile') },
  job: {
    root: url('/job'),
    findById: (id: string) => url(`/job/${id}`),
    update: (id: string) => url(`/job/${id}`),
    delete: (id: string) => url(`/job/${id}`),
  },
  jobLog: {
    root: url('/job-log'),
    update: (id: string) => url(`/job-log/${id}`),
    delete: (id: string) => url(`/job-log/${id}`),
  },
  jobList: {
    root: url('/job-list'),
  },
};
