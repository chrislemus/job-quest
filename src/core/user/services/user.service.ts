import { jobQuestApiService, jobQuestApiConfig } from '../../job-quest-api';

const getProfile = () => {
  return jobQuestApiService
    .get<{ id: number; email: string }>(jobQuestApiConfig.urls.auth.profile)
    .then(({ data }) => data);
};

export const userService = {
  getProfile,
};
