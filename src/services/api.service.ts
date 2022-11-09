import axios from 'axios';
import { tokenService } from './token.service';

export const apiService = axios.create({
  baseURL: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
});

apiService.interceptors.request.use((config) => {
  const token = tokenService.getLocalAccessToken();
  if (
    token &&
    config?.url !== '/auth/login' &&
    config?.url !== '/auth/refresh'
  ) {
    if (!config.headers) config['headers'] = {};
    config.headers['Authorization'] = 'Bearer ' + token;
  }
  return config;
});

apiService.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalConfig = err.config;

    if (originalConfig?.url !== '/auth/login' && err.response) {
      if (err.response.status === 401) {
        if (!originalConfig._retry) {
          originalConfig._retry = true;

          try {
            const refreshToken = tokenService.getLocalRefreshToken();
            const res = await apiService.post(
              '/auth/refresh',
              {},
              { headers: { Authorization: `Bearer ${refreshToken}` } }
            );
            const { access_token } = res.data;
            tokenService.updateLocalAccessToken(access_token);
            return apiService(originalConfig);
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
