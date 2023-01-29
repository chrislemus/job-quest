import axios from 'axios';
import { authLocalStore } from './auth-local-store.service';
import { jobQuestApiUrls } from './job-quest-api-urls.const';

/**
 * Job Quest API Http instance.
 * - Abstracts all low level auth details from consumers.
 */
export const jobQuestApiService = axios.create({
  headers: { 'Content-Type': 'application/json' },
});

/**
 * Intercept outgoing request to provide auth details.
 */
jobQuestApiService.interceptors.request.use((config) => {
  // ensure that calls are only made to API to avoid sending auth details to other resources
  if (!jobQuestApiUrls.root) throw new Error('jobQuestApiUrl not provided');
  if (!config.url?.startsWith(jobQuestApiUrls.root)) {
    throw Error('jobQuestApiService Forbidden url call');
  }

  let token: string | undefined;
  const tokens = authLocalStore.getTokens();

  if (config?.url === jobQuestApiUrls.auth.refresh) {
    token = tokens?.refreshToken;
  } else if (config?.url !== jobQuestApiUrls.auth.login) {
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
jobQuestApiService.interceptors.response.use(
  (res) => res,
  async (err) => {
    const config = err.config;
    const tokens = authLocalStore.getTokens();
    const authErrorCode =
      err?.response?.status === 401 || err?.response?.status === 403;
    const failedAuthReq = !!authErrorCode && !!tokens;
    if (
      config?.url !== jobQuestApiUrls.auth.login &&
      config?.url !== jobQuestApiUrls.auth.refresh &&
      err.response
    ) {
      if (failedAuthReq) {
        if (!config._retry) {
          config._retry = true;

          try {
            const refreshToken = tokens?.refreshToken;
            const res = await jobQuestApiService.post(
              jobQuestApiUrls.auth.refresh,
              {},
              { headers: { Authorization: `Bearer ${refreshToken}` } }
            );
            const accessToken = res?.data?.data?.accessToken;
            authLocalStore.updateToken('accessToken', accessToken);
            return jobQuestApiService(config);
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
