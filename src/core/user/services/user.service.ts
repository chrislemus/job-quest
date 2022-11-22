import { jobQuestHttp, jobQuestHttpConfig } from '@core/http/job-quest';

async function getProfile() {
  const res = await jobQuestHttp.get<{
    data: { id: number; email: string; firstName: string; lastName: string };
  }>(jobQuestHttpConfig.urls.auth.profile);
  const data = res?.data;
  return data?.data;
}

export const userService = {
  getProfile,
};
