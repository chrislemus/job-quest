import { jobQuestApiService } from '@common/api/job-quest';
import { UserSignUp } from '@core/auth/dto';
import { authLocalStore } from './auth-local-store.service';
import { JWT } from '../types';
import { ApiOkRes } from '@common/api/job-quest/interface';
import { AxiosResponse as AxiosRes } from 'axios';

// TODO: Add error response handlers. Including NETWORK error.
// NETWORK axios error occurs on mobile device when trying to call localhost
// instead of actual IP address

// TODO: add auth error res using API ERROR

/**
 * Signup a new user
 * @returns JWT on success or error details if failed
 */
function signup(user: UserSignUp): Promise<AxiosRes<ApiOkRes<JWT>>> {
  return jobQuestApiService
    .post<ApiOkRes<JWT>>('/auth/signup', user)
    .then((res) => {
      const tokens = res?.data?.data;
      if (tokens) authLocalStore.setTokens(tokens);
      return res;
    });
}

/**
 *
 * User login
 * @returns JWT on success or error details if failed
 */
async function login(email: string, password: string): Promise<ApiOkRes<JWT>> {
  const response = await jobQuestApiService.post<ApiOkRes<JWT>>('/auth/login', {
    email,
    password,
  });
  const data = response?.data;
  const tokens = data?.data;
  if (tokens) authLocalStore.setTokens(tokens);
  return data;
}

/**
 * Logout user
 */
async function logout(): Promise<boolean> {
  await jobQuestApiService.post('/auth/logout');
  authLocalStore.removeTokens();
  return true;
}

/**
 * Checks if auth user has access to a resource.
 * @param urlPath URL path user is trying to access.
 * @returns If `true`, user has access to resource.
 */
function validateRouteAccess(urlPath: string): boolean {
  const isProtectedRoute = urlPath?.startsWith('/dashboard');
  if (isProtectedRoute) {
    const tokens = authLocalStore.getTokens();
    return !!tokens;
  }
  return true;
}

/**
 * Checks if user is authenticated.
 * @returns If `true`, user is authenticated.
 */
function isAuthenticated(): boolean {
  return !!authLocalStore.getTokens();
}

export const authService = {
  signup,
  login,
  logout,
  validateRouteAccess,
  isAuthenticated,
};
