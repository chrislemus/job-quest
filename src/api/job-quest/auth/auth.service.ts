import { jobQuestHttpService } from '@/api/job-quest/services/job-quest-http.service';
import { jobQuestApiUrls } from '@/api/job-quest/job-quest-api-urls.const';
import { authLocalStore } from './auth-local-store.service';
import { AuthSignUpArgs, AuthLogInArgs } from '@/api/job-quest/auth/types';
import { validateOrReject } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import {
  AuthSignUpRes,
  AuthLogInRes,
  AuthLogOutRes,
  AuthRefreshJwtRes,
} from '@/api/job-quest/auth/dto';

async function signup(user: AuthSignUpArgs): Promise<AuthSignUpRes> {
  const res = await jobQuestHttpService
    .post<AuthSignUpRes>(jobQuestApiUrls.auth.signup, user)
    .then(async (res) => {
      const data = plainToInstance(AuthSignUpRes, res?.data);
      await validateOrReject(data);
      return data;
    });

  const tokens = res.data;
  authLocalStore.setTokens(tokens);
  return res;
}

async function login(credentials: AuthLogInArgs): Promise<AuthLogInRes> {
  const res = await jobQuestHttpService
    .post<AuthLogInRes>(jobQuestApiUrls.auth.login, credentials)
    .then(async (res) => {
      const data = plainToInstance(AuthLogInRes, res.data);
      await validateOrReject(data);
      return data;
    });

  const tokens = res.data;
  authLocalStore.setTokens(tokens);
  return res;
}

async function refreshJwt(): Promise<AuthRefreshJwtRes> {
  const refreshToken = authLocalStore.getTokens()?.refreshToken;
  const res = await jobQuestHttpService
    .post<AuthRefreshJwtRes>(
      jobQuestApiUrls.auth.refresh,
      {},
      { headers: { Authorization: `Bearer ${refreshToken}` } }
    )
    .then(async (res) => {
      const data = plainToInstance(AuthRefreshJwtRes, res.data);
      await validateOrReject(data);
      return data;
    })
    .catch((e) => {
      authLocalStore.removeTokens();
      throw new Error(e);
    });

  const tokens = res.data;
  authLocalStore.setTokens(tokens);

  return res;
}

async function logout(): Promise<AuthLogOutRes> {
  const res = await jobQuestHttpService
    .post<AuthLogOutRes>(jobQuestApiUrls.auth.logout)
    .then(async (res) => {
      const data = plainToInstance(AuthLogOutRes, res.data);
      await validateOrReject(data);
      return data;
    });

  const logOutSuccess = res.data;
  if (logOutSuccess) authLocalStore.removeTokens();

  return res;
}

/** Check if currently authenticated */
function isAuthenticated(): boolean {
  return !!authLocalStore.getTokens();
}

export const authService = {
  signup,
  login,
  refreshJwt,
  logout,
  isAuthenticated,
};
