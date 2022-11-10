import { jobQuestApiService as apiService } from '@src/features/job-quest-api';

export type JWT = {
  access_token: string;
  refresh_token: string;
};

const signup = (email: string, password: string) => {
  return apiService.post('/auth/signup', { email, password });
};

const login = (email: string, password: string) => {
  return apiService.post('/auth/login', { email, password }).then((res) => {
    if (res?.data?.access_token) {
      setTokens(res.data);
    }
    return res;
  });
};

const logout = () => {
  return apiService.post('/auth/logout').then((res) => {
    removeTokens();
    return res;
  });
};

const updateLocalAccessToken = (token: string) => {
  const user = getTokens();
  if (user) {
    user.access_token = token;
    localStorage.setItem('user', JSON.stringify(user));
  }
};

const getTokens = (): JWT | null => {
  const strObj = localStorage.getItem('user');
  return strObj === null ? null : (JSON.parse(strObj) as JWT);
};

const setTokens = (tokens: JWT) => {
  localStorage.setItem('user', JSON.stringify(tokens));
};

const removeTokens = () => {
  localStorage.removeItem('user');
};

const validateRouteAccess = (urlPath: string) => {
  const isProtectedRoute = urlPath?.startsWith('/dashboard');
  if (isProtectedRoute) {
    const tokens = authService.getTokens();
    return !!tokens;
  }
  return true;
};

export const authService = {
  signup,
  login,
  logout,
  updateLocalAccessToken,
  validateRouteAccess,
  getTokens,
  setTokens,
  removeTokens,
};
