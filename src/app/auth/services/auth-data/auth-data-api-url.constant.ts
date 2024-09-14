import { jobQuestApiConfig } from '@/core/configs';

const root = jobQuestApiConfig.baseUrl;
const url = <T extends string>(resource: T) => `${root}${resource}` as const;

export const authDataApiUrlConstant = {
  login: url('/auth/login'),
  refresh: url('/auth/refresh'),
  signup: url('/auth/signup'),
  logout: url('/auth/logout'),
};
