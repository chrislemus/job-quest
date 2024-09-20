import { jobQuestHttpService } from '@/shared/services';
import { authLocalStore } from './auth-local-store.service';
import { authDataApiUrlConstant } from './auth-data-api-url.constant';
import {
  AuthSignUpResBodyDto,
  AuthLogInResBodyDto,
  AuthRefreshJwtResBodyDto,
  AuthSignUpReqConfigDto,
  AuthLogInReqConfigDto,
} from '@/app/auth/services/auth-data/dto';

async function signup(
  config: AuthSignUpReqConfigDto
): Promise<AuthSignUpResBodyDto> {
  const { body } = AuthSignUpReqConfigDto.parse(config);
  const url = authDataApiUrlConstant.signup;
  const res = await jobQuestHttpService.post(url, body);
  const data = AuthSignUpResBodyDto.parse(res.data);
  authLocalStore.setTokens(data);
  return data;
}

async function login(
  config: AuthLogInReqConfigDto
): Promise<AuthLogInResBodyDto> {
  const { body } = AuthLogInReqConfigDto.parse(config);
  const url = authDataApiUrlConstant.login;
  const res = await jobQuestHttpService.post(url, body);
  const data = AuthLogInResBodyDto.parse(res.data);
  authLocalStore.setTokens(data);
  return data;
}

async function refreshJwt(): Promise<AuthRefreshJwtResBodyDto> {
  try {
    const refreshToken = authLocalStore.getTokens()?.refreshToken;
    const url = authDataApiUrlConstant.refresh;
    const headers = { Authorization: `Bearer ${refreshToken}` };
    const res = await jobQuestHttpService.post(url, { headers });

    const data = AuthRefreshJwtResBodyDto.parse(res.data);
    authLocalStore.setTokens(data);
    return data;
  } catch (error: Error | any) {
    authLocalStore.removeTokens();
    throw new Error(error);
  }
}

async function logout(): Promise<void> {
  let error: Error | any;
  try {
    await jobQuestHttpService.post(authDataApiUrlConstant.logout);
  } catch (e) {
    error = e;
  }
  authLocalStore.removeTokens();
  if (error) throw new Error(error);
}

/** Check if currently authenticated */
function isAuthenticated(): boolean {
  return !!authLocalStore.getTokens();
}

export const authDataService = {
  signup,
  login,
  refreshJwt,
  logout,
  isAuthenticated,
};
