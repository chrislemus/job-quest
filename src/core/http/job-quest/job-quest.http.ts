import axios from 'axios';
import { jobQuestHttpConfig } from './job-quest-http.config';
import { authLocalStore } from '@core/auth/services';

/** Api URLs */
const httpUrls = jobQuestHttpConfig.urls;

/**
 * Job Quest API Http instance.
 * - Abstracts all low level auth details from consumers.
 */
export const jobQuestHttp = axios.create({
  baseURL: httpUrls.base,
  headers: { 'Content-Type': 'application/json' },
});

/**
 * Intercept outgoing request to provide auth details.
 */
jobQuestHttp.interceptors.request.use((config) => {
  let token: string | undefined;
  const tokens = authLocalStore.getTokens();

  if (config?.url === httpUrls.auth.refresh) {
    token = tokens?.refreshToken;
  } else if (config?.url !== httpUrls.auth.login) {
    token = tokens?.accessToken;
  }

  if (token) {
    if (!config.headers) config['headers'] = {};
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  return config;
});

/**
 * Intercept incoming response to check for fail auth and implement retry strategy.
 */
jobQuestHttp.interceptors.response.use(
  (res) => res,
  async (err) => {
    const config = err.config;
    const tokens = authLocalStore.getTokens();
    const authErrorCode =
      err?.response?.status === 401 || err?.response?.status === 403;
    const failedAuthReq = authErrorCode && tokens;
    if (
      config?.url !== httpUrls.auth.login &&
      config?.url !== httpUrls.auth.refresh &&
      err.response
    ) {
      if (failedAuthReq) {
        if (!config._retry) {
          config._retry = true;

          try {
            const refreshToken = tokens?.refreshToken;
            const res = await jobQuestHttp.post(
              httpUrls.auth.refresh,
              {},
              { headers: { Authorization: `Bearer ${refreshToken}` } }
            );
            const accessToken = res?.data?.data?.accessToken;
            authLocalStore.updateToken('accessToken', accessToken);
            return jobQuestHttp(config);
          } catch (_error) {
            const err: any = _error;
            if (err?.response?.data) {
              return Promise.reject(err?.response?.data);
            } else {
              return Promise.reject(err);
            }
          }
        } else {
          authLocalStore.removeTokens();
        }
      }
    }
    if (failedAuthReq) authLocalStore.removeTokens();
    return Promise.reject(err?.response?.data || err?.response || err);
  }
);
