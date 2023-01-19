/**
 * Job Quest Api Urls
 */
export const jobQuestApiUrls = {
  root: `${process.env.NEXT_PUBLIC_JOBQUEST_API_ROOT_URL}`,
  auth: {
    login: '/auth/login',
    refresh: '/auth/refresh',
    signup: '/auth/signup',
    logout: '/auth/logout',
  },
  user: { profile: '/user/profile' },
  job: {
    root: '/job',
    findById: (id: number) => `/job/${id}`,
    update: (id: number) => `/job/${id}`,
    delete: (id: number) => `/job/${id}`,
  },
  jobLog: {
    root: '/job-log',
  },
  jobList: {
    root: '/job-list',
  },
};
