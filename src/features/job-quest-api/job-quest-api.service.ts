import axios from 'axios';
import { authService } from '@src/features/auth';
import { jobQuestApiConfig } from './job-quest-api.config';

const apiUrls = jobQuestApiConfig.urls;

export const jobQuestApiService = axios.create({
  baseURL: apiUrls.base,
  headers: { 'Content-Type': 'application/json' },
});

jobQuestApiService.interceptors.request.use((config) => {
  let token: string | undefined;
  const tokens = authService.getTokens();

  if (config?.url === apiUrls.auth.refresh) {
    token = tokens?.refresh_token;
  } else if (config?.url !== apiUrls.auth.login) {
    token = tokens?.access_token;
  }

  if (token) {
    if (!config.headers) config['headers'] = {};
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  return config;
});

jobQuestApiService.interceptors.response.use(
  (res) => res,
  async (err) => {
    const config = err.config;

    if (
      config?.url !== apiUrls.auth.login &&
      config?.url !== apiUrls.auth.refresh &&
      err.response
    ) {
      const tokens = authService.getTokens();
      if (err.response.status === 401 && tokens) {
        if (!config._retry) {
          config._retry = true;

          try {
            const refreshToken = tokens?.refresh_token;
            const res = await jobQuestApiService.post(
              apiUrls.auth.refresh,
              {},
              { headers: { Authorization: `Bearer ${refreshToken}` } }
            );
            const { access_token } = res.data;
            authService.updateLocalAccessToken(access_token);
            return jobQuestApiService(config);
          } catch (_error) {
            return Promise.reject(_error);
          }
        } else {
          authService.removeTokens();
        }
      }
    }

    return Promise.reject(err);
  }
);
