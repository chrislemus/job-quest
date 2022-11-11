import { jobQuestHttp, jobQuestHttpConfig } from '@core/http/job-quest';

const getProfile = () => {
  return jobQuestHttp
    .get<{ id: number; email: string; firstName: string; lastName: string }>(
      jobQuestHttpConfig.urls.auth.profile
    )
    .then(({ data }) => data);
};

export const userService = {
  getProfile,
};
