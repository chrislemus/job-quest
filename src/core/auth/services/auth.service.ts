import { jobQuestHttp } from '@core/http/job-quest';
import { UserSignup } from '@core/auth/dto';
import { authLocalStore } from './auth-local-store.service';

const signup = (user: UserSignup) => {
  return jobQuestHttp.post('/auth/signup', user).then((res) => {
    const tokens = res?.data?.data;
    if (tokens) authLocalStore.setTokens(tokens);
    return res;
  });
};

const login = (email: string, password: string) => {
  return jobQuestHttp.post('/auth/login', { email, password }).then((res) => {
    const tokens = res?.data?.data;
    if (tokens) authLocalStore.setTokens(tokens);
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

const isAuthenticated = () => {
  return !!authLocalStore.getTokens();
};

export const authService = {
  signup,
  login,
  logout,
  validateRouteAccess,
  isAuthenticated,
};
