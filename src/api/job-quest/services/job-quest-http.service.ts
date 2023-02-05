import axios, { AxiosError } from 'axios';
import { authLocalStore } from '@api/job-quest/auth/auth-local-store.service';
import { jobQuestApiUrls } from '@api/job-quest/job-quest-api-urls.const';
import { authService } from '../auth/auth.service';

/**
 * Job Quest API Http instance.
 * - Abstracts all low level auth details from consumers.
 */
export const jobQuestHttpService = axios.create({
  headers: { 'Content-Type': 'application/json' },
});

/**
 * auth credentials urls that do not require JWT
 */
const authCredentialsUrl = new Set<string>([
  jobQuestApiUrls.auth.login,
  jobQuestApiUrls.auth.refresh,
  jobQuestApiUrls.auth.signup,
]);

jobQuestHttpService.interceptors.request.use((config) => {
  // ensure that calls are only made to API to avoid sending auth details to other resources
  if (!jobQuestApiUrls.root) throw new Error('jobQuestApiUrl not provided');
  if (!config.url?.startsWith(jobQuestApiUrls.root)) {
    throw Error('jobQuestHttpService Forbidden url call');
  }

  // authentication urls that send user credentials do not require auth tokens
  if (authCredentialsUrl.has(config.url)) {
    return config;
  }

  const accessToken = authLocalStore.getTokens()?.accessToken;
  if (accessToken) {
    if (!config.headers) config['headers'] = {};
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }
  return config;
});

function isAuthErrCode(code: number) {
  return code === 401 || code === 403;
}

/**
 * Intercept incoming response to check for fail auth and implement retry strategy.
 */
jobQuestHttpService.interceptors.response.use(
  (res) => res,
  async (err: AxiosError) => {
    const config = err.config;

    const errCode = err?.response?.status;
    const authErrorCode: boolean = !!errCode && isAuthErrCode(errCode);

    const failedAuthReq =
      authErrorCode &&
      authService.isAuthenticated() &&
      !authCredentialsUrl.has(config?.url || '');

    if (config && failedAuthReq) {
      try {
        await authService.refreshJwt();
        // once request above completes(jwt refresh)
        // retry original request (below)
        return jobQuestHttpService(config);
      } catch (error: any) {
        return Promise.reject(error);
      }
    }
    return Promise.reject(err?.response?.data || err?.response || err);
  }
);
