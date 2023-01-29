import { jobQuestApiService, jobQuestApiUrls } from '@common/api/job-quest';
import { UserSignUp } from '@app/auth/_dto';
import { JWT } from '@app/auth/_types';
import { ApiOkRes } from '@common/api/job-quest/types';

// TODO: Add error response handlers. Including NETWORK error.
// NETWORK axios error occurs on mobile device when trying to call localhost
// instead of actual IP address

// TODO: add auth error res using API ERROR

/**
 * Signup a new user
 * @returns JWT on success or error details if failed
 */
async function signup(user: UserSignUp): Promise<ApiOkRes<JWT>> {
  const res = await jobQuestApiService.post<ApiOkRes<JWT>>(
    jobQuestApiUrls.auth.signup,
    user
  );

  const data = res?.data;
  return data;
}

/**
 *
 * User login
 * @returns JWT on success or error details if failed
 */
async function login(email: string, password: string): Promise<ApiOkRes<JWT>> {
  const res = await jobQuestApiService.post<ApiOkRes<JWT>>(
    jobQuestApiUrls.auth.login,
    {
      email,
      password,
    }
  );

  const data = res?.data;
  return data;
}

/**
 * Logout user
 */
async function logout(): Promise<ApiOkRes<boolean>> {
  const res = await jobQuestApiService.post<ApiOkRes<boolean>>(
    jobQuestApiUrls.auth.logout
  );

  const data = res?.data;
  return data;
}

export const authService = {
  signup,
  login,
  logout,
};
