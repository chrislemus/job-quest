import axios, { AxiosError, AxiosRequestHeaders } from 'axios';
import { authLocalStore } from '@/app/auth/services/auth-data/auth-local-store.service';
import { authDataService } from '@/app/auth/services';
import { authDataApiUrlConstant } from '@/app/auth/services/auth-data/auth-data-api-url.constant';
import { jobQuestApiConfig } from '@/core/configs';

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
  authDataApiUrlConstant.login,
  authDataApiUrlConstant.refresh,
  authDataApiUrlConstant.signup,
]);

jobQuestHttpService.interceptors.request.use((config) => {
  // ensure that calls are only made to API to avoid sending auth details to other resources
  if (!jobQuestApiConfig.baseUrl)
    throw new Error('jobQuestApiUrl not provided');
  if (!config.url?.startsWith(jobQuestApiConfig.baseUrl)) {
    throw Error('jobQuestHttpService Forbidden url call');
  }

  // authentication urls that send user credentials do not require auth tokens
  if (authCredentialsUrl.has(config.url)) {
    return config;
  }

  const accessToken = authLocalStore.getTokens()?.accessToken;
  if (accessToken) {
    if (!config.headers) config['headers'] = {} as AxiosRequestHeaders;
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
      authDataService.isAuthenticated() &&
      !authCredentialsUrl.has(config?.url || '');

    if (config && failedAuthReq) {
      try {
        await authDataService.refreshJwt();
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
