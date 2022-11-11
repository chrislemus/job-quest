import axios from 'axios';
import { jobQuestHttpConfig } from './job-quest.config';
import { authLocalStore } from '@core/auth/services';

const httpUrls = jobQuestHttpConfig.urls;

export const jobQuestHttp = axios.create({
  baseURL: httpUrls.base,
  headers: { 'Content-Type': 'application/json' },
});

jobQuestHttp.interceptors.request.use((config) => {
  let token: string | undefined;
  const tokens = authLocalStore.getTokens();

  if (config?.url === httpUrls.auth.refresh) {
    token = tokens?.refresh_token;
  } else if (config?.url !== httpUrls.auth.login) {
    token = tokens?.access_token;
  }

  if (token) {
    if (!config.headers) config['headers'] = {};
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  return config;
});

jobQuestHttp.interceptors.response.use(
  (res) => res,
  async (err) => {
    const config = err.config;

    if (
      config?.url !== httpUrls.auth.login &&
      config?.url !== httpUrls.auth.refresh &&
      err.response
    ) {
      const tokens = authLocalStore.getTokens();
      if (err.response.status === 401 && tokens) {
        if (!config._retry) {
          config._retry = true;

          try {
            const refreshToken = tokens?.refresh_token;
            const res = await jobQuestHttp.post(
              httpUrls.auth.refresh,
              {},
              { headers: { Authorization: `Bearer ${refreshToken}` } }
            );
            const { access_token } = res.data;
            authLocalStore.updateToken('access_token', access_token);
            return jobQuestHttp(config);
          } catch (_error) {
            return Promise.reject(_error);
          }
        } else {
          authLocalStore.removeTokens();
        }
      }
    }

    return Promise.reject(err);
  }
);
