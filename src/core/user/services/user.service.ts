import { jobQuestHttp, jobQuestHttpConfig } from '@core/http/job-quest';

const getProfile = () => {
  return jobQuestHttp
    .get<{
      data: { id: number; email: string; firstName: string; lastName: string };
    }>(jobQuestHttpConfig.urls.auth.profile)
    .then((res) => {
      const profile = res.data?.data;
      return profile;
    });
};

export const userService = {
  getProfile,
};
