import { jobQuestHttpService } from '@/api/job-quest/services/job-quest-http.service';
import { jobQuestApiUrls } from '@/api/job-quest/job-quest-api-urls.const';
import { authLocalStore } from './auth-local-store.service';
import { AuthSignUpArgs, AuthLogInArgs } from '@/api/job-quest/auth/types';
import { validateOrReject } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import {
  AuthSignUpRes,
  AuthLogInRes,
  AuthLogOutResDto,
  AuthRefreshJwtRes,
} from '@/api/job-quest/auth/dto';

async function signup(user: AuthSignUpArgs): Promise<AuthSignUpRes> {
  const data = await jobQuestHttpService
    .post<AuthSignUpRes>(jobQuestApiUrls.auth.signup, user)
    .then(async (res) => {
      const data = plainToInstance(AuthSignUpRes, res);
      await validateOrReject(data);
      return data;
    });

  authLocalStore.setTokens(data);
  return data;
}

async function login(credentials: AuthLogInArgs): Promise<AuthLogInRes> {
  const tokens = await jobQuestHttpService
    .post<AuthLogInRes>(jobQuestApiUrls.auth.login, credentials)
    .then(async (res) => {
      const data = plainToInstance(AuthLogInRes, res.data);
      await validateOrReject(data);
      return data;
    });

  authLocalStore.setTokens(tokens);
  return tokens;
}

async function refreshJwt(): Promise<AuthRefreshJwtRes> {
  const refreshToken = authLocalStore.getTokens()?.refreshToken;
  const tokens = await jobQuestHttpService
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

  authLocalStore.setTokens(tokens);

  return tokens;
}

async function logout(): Promise<AuthLogOutResDto> {
  const logOutSuccess = await jobQuestHttpService
    .post<AuthLogOutResDto>(jobQuestApiUrls.auth.logout)
    .then(async (res) => {
      return AuthLogOutResDto.parse(res.data);
    });

  if (logOutSuccess) authLocalStore.removeTokens();

  return logOutSuccess;
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
