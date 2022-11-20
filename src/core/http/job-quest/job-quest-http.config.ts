export const jobQuestHttpConfig = {
  urls: {
    // base: 'http://localhost:3001',
    base: 'http://172.20.10.2:3001',
    auth: {
      login: '/auth/login',
      refresh: '/auth/refresh',
      signup: '/auth/signup',
      logout: '/auth/logout',
      profile: '/auth/profile',
    },
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
