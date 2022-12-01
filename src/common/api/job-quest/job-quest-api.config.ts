/**
 * Http config configurations
 */
export const jobQuestHttpConfig = {
  urls: {
    base: `${process.env.NEXT_PUBLIC_JOBQUEST_API_ROOT_URL}`,
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
    jobList: {
      root: '/job-list',
    },
  },
};
