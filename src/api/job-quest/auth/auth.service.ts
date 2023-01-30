import { jobQuestHttpService } from '@api/job-quest/services/job-quest-http.service';
import { UserSignUp } from '@app/auth/dto';
import { ApiOkRes } from '@api/job-quest/types';
import { JWT } from '@api/job-quest/auth/dto';
import { jobQuestApiUrls } from '@api/job-quest/job-quest-api-urls.const';
import { authLocalStore } from './auth-local-store.service';

// TODO: Add error response handlers. Including NETWORK error.
// NETWORK axios error occurs on mobile device when trying to call localhost
// instead of actual IP address

// TODO: add auth error res using API ERROR

/**
 * Signup a new user
 * @returns JWT on success or error details if failed
 */
async function signup(user: UserSignUp): Promise<ApiOkRes<JWT>> {
  const res = await jobQuestHttpService.post<ApiOkRes<JWT>>(
    jobQuestApiUrls.auth.signup,
    user
  );

  const data = res?.data;
  const tokens = data?.data;
  if (tokens) authLocalStore.setTokens(tokens);

  return data;
}

/**
 *
 * User login
 * @returns JWT on success or error details if failed
 */
async function login(email: string, password: string): Promise<ApiOkRes<JWT>> {
  const res = await jobQuestHttpService.post<ApiOkRes<JWT>>(
    jobQuestApiUrls.auth.login,
    {
      email,
      password,
    }
  );

  const data = res?.data;
  const tokens = data?.data;
  if (tokens) authLocalStore.setTokens(tokens);
  return data;
}

/**
 * Logout user
 */
async function logout(): Promise<ApiOkRes<boolean>> {
  const res = await jobQuestHttpService.post<ApiOkRes<boolean>>(
    jobQuestApiUrls.auth.logout
  );

  const data = res?.data;

  const logOutSuccess = data?.data;
  if (logOutSuccess) authLocalStore.removeTokens();

  return data;
}

/** Check if currently authenticated */
function isAuthenticated(): boolean {
  return !!authLocalStore.getTokens();
}

export const authService = {
  signup,
  login,
  logout,
  isAuthenticated,
};
