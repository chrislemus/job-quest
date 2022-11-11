import { jobQuestHttp } from '@core/http/job-quest';
import { authLocalStore } from './auth-local-store.service';

const signup = (email: string, password: string) => {
  return jobQuestHttp.post('/auth/signup', { email, password });
};

const login = (email: string, password: string) => {
  return jobQuestHttp.post('/auth/login', { email, password }).then((res) => {
    if (res?.data?.access_token) {
      authLocalStore.setTokens(res.data);
    }
    return res;
  });
};

const logout = () => {
  return jobQuestHttp.post('/auth/logout').then((res) => {
    authLocalStore.removeTokens();
    return res;
  });
};

const validateRouteAccess = (urlPath: string) => {
  const isProtectedRoute = urlPath?.startsWith('/dashboard');
  if (isProtectedRoute) {
    const tokens = authLocalStore.getTokens();
    return !!tokens;
  }
  return true;
};

export const authService = {
  signup,
  login,
  logout,
  validateRouteAccess,
};
