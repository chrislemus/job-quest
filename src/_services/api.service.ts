import axios from 'axios';
import { tokenService } from './token.service';

export const apiUrl = {
  baseURL: 'http://localhost:3001',
  auth: {
    login: '/auth/login',
    refresh: '/auth/refresh',
    signup: '/auth/signup',
    logout: '/auth/logout',
    profile: '/auth/profile',
  },
} as const;

export const apiService = axios.create({
  baseURL: apiUrl.baseURL,
  headers: { 'Content-Type': 'application/json' },
});

apiService.interceptors.request.use((config) => {
  let token: string | undefined;
  const authUser = tokenService.getAuthUser();

  if (config?.url === apiUrl.auth.refresh) {
    token = authUser?.refresh_token;
  } else if (config?.url !== apiUrl.auth.login) {
    token = authUser?.access_token;
  }

  if (token) {
    if (!config.headers) config['headers'] = {};
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  return config;
});

apiService.interceptors.response.use(
  (res) => res,
  async (err) => {
    const config = err.config;

    if (
      config?.url !== apiUrl.auth.login &&
      config?.url !== apiUrl.auth.refresh &&
      err.response
    ) {
      const authUser = tokenService.getAuthUser();
      if (err.response.status === 401 && authUser) {
        if (!config._retry) {
          config._retry = true;

          try {
            const refreshToken = authUser?.refresh_token;
            const res = await apiService.post(
              apiUrl.auth.refresh,
              {},
              { headers: { Authorization: `Bearer ${refreshToken}` } }
            );
            const { access_token } = res.data;
            tokenService.updateLocalAccessToken(access_token);
            return apiService(config);
          } catch (_error) {
            return Promise.reject(_error);
          }
        } else {
          tokenService.removeUser();
        }
      }
    }

    return Promise.reject(err);
  }
);
