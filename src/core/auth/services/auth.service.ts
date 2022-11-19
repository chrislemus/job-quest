import { jobQuestHttp } from '@core/http/job-quest';
import { UserSignup } from '@core/auth/dto';
import { authLocalStore } from './auth-local-store.service';

// TODO: Add error response handlers. Including NETWORK error.
// NETWORK axios error occurs on mobile device when trying to call localhost
// instead of actual IP address

const signup = (user: UserSignup) => {
  return jobQuestHttp.post('/auth/signup', user).then((res) => {
    const tokens = res?.data?.data;
    if (tokens) authLocalStore.setTokens(tokens);
    return res;
  });
};

async function login(email: string, password: string) {
  const response = await jobQuestHttp.post('/auth/login', { email, password });
  const data = response?.data;
  const tokens = data?.data;
  if (tokens) authLocalStore.setTokens(tokens);
  return data;
}

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
