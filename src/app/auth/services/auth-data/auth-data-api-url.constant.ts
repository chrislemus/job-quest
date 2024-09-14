import { jobQuestApiConfig } from '@/core/configs';

const url = jobQuestApiConfig.createUrl;

export const authDataApiUrlConstant = {
  login: url('/auth/login'),
  refresh: url('/auth/refresh'),
  signup: url('/auth/signup'),
  logout: url('/auth/logout'),
};
