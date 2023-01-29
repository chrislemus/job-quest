let root = process.env.NEXT_PUBLIC_JOBQUEST_API_ROOT_URL;
const url = (resource: string): string => `${root}${resource}`;

/**
 * Job Quest Api Urls
 */
export const jobQuestApiUrls = {
  root: root,
  auth: {
    login: url('/auth/login'),
    refresh: url('/auth/refresh'),
    signup: url('/auth/signup'),
    logout: url('/auth/logout'),
  },
  user: { profile: url('/user/profile') },
  job: {
    root: url('/job'),
    findById: (id: number) => url(`/job/${id}`),
    update: (id: number) => url(`/job/${id}`),
    delete: (id: number) => url(`/job/${id}`),
  },
  jobLog: {
    root: url('/job-log'),
    update: (id: number) => url(`/job-log/${id}`),
    delete: (id: number) => url(`/job-log/${id}`),
  },
  jobList: {
    root: url('/job-list'),
  },
};
