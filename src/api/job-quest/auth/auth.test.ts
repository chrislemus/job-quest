import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { jobQuestApiUrls } from '@api/job-quest/job-quest-api-urls.const';
import { server, rest } from '@tests/server';
import { authService } from './auth.service';
import { signUpMockCredentials, logInMockCredentials } from './auth.mocks';
import { userService } from '../user/user.service';
import { authLocalStore } from './auth-local-store.service';
import { userProfileMock } from '@api/job-quest/user/user.mocks';
import { UserProfileRes } from '@api/job-quest/user/dto';
import {
  AuthSignUpRes,
  AuthLogInRes,
  AuthLogOutRes,
  AuthRefreshJwtRes,
} from '@api/job-quest/auth/dto';

afterEach(() => {
  jest.resetAllMocks();
});

describe('AuthService', () => {
  test('signup() contains valid global server handlers', async () => {
    const res = await authService
      .signup(signUpMockCredentials)
      .then((res) => plainToInstance(AuthSignUpRes, res));

    await validateOrReject(res);
  });

  test('signup() validates response data', async () => {
    // return invalid response data
    server.use(
      rest.post(jobQuestApiUrls.auth.signup, (_req, res, ctx) => {
        return res(ctx.json({}));
      })
    );

    let error = false;
    await authService
      .signup(signUpMockCredentials)
      .catch((_e: any) => (error = true));

    expect(error).toBeTruthy();
  });

  test('login() contains valid global server handlers', async () => {
    const res = await authService
      .login(logInMockCredentials)
      .then((res) => plainToInstance(AuthLogInRes, res));

    await validateOrReject(res);
  });

  test('login() validates response data', async () => {
    // return invalid response data
    server.use(
      rest.post(jobQuestApiUrls.auth.login, (_req, res, ctx) => {
        return res(ctx.json({}));
      })
    );

    let error = false;
    await authService
      .login(logInMockCredentials)
      .catch((_e: any) => (error = true));

    expect(error).toBeTruthy();
  });

  test('logout() contains valid global server handlers', async () => {
    const res = await authService
      .logout()
      .then((res) => plainToInstance(AuthLogOutRes, res));

    await validateOrReject(res);
  });

  test('logout() validates response data', async () => {
    // return invalid response data
    server.use(
      rest.post(jobQuestApiUrls.auth.logout, (_req, res, ctx) => {
        return res(ctx.json({}));
      })
    );

    let error = false;
    await authService.logout().catch((_e: any) => (error = true));
    expect(error).toBeTruthy();
  });

  test('refresh() contains valid global server handlers', async () => {
    const res = await authService
      .refreshJwt()
      .then((res) => plainToInstance(AuthRefreshJwtRes, res));

    await validateOrReject(res);
  });

  test('refresh() validates response data', async () => {
    // return invalid response data
    server.use(
      rest.post(jobQuestApiUrls.auth.refresh, (_req, res, ctx) => {
        return res(ctx.json({}));
      })
    );

    let error = false;
    await authService.refreshJwt().catch((_e: any) => (error = true));
    expect(error).toBeTruthy();
  });

  test('refresh() should try to refresh token once', async () => {
    jest.spyOn(authService, 'isAuthenticated').mockImplementation(() => true);
    const authLocalStoreGetTokens = jest.spyOn(authLocalStore, 'getTokens');
    const authLocalStoreRemoveTokens = jest.spyOn(
      authLocalStore,
      'removeTokens'
    );

    let userRequestCounter = 0;
    server.use(
      rest.get(jobQuestApiUrls.user.profile, (_req, res, ctx) => {
        userRequestCounter++;
        return res(ctx.status(401));
      })
    );

    let refreshRequestCounter = 0;
    server.use(
      rest.post(jobQuestApiUrls.auth.refresh, (_req, res, ctx) => {
        refreshRequestCounter++;
        return res(ctx.status(401));
      })
    );

    await userService.profile().catch((_e) => {});

    expect(authLocalStoreGetTokens).toBeCalledTimes(2);
    expect(userRequestCounter).toEqual(1);
    expect(refreshRequestCounter).toEqual(1);
    expect(authLocalStoreRemoveTokens).toBeCalledTimes(1);
  });

  test('refresh() should try to refresh token(once) and retry original request(once)', async () => {
    jest.spyOn(authService, 'isAuthenticated').mockImplementation(() => true);
    const authLocalStoreGetTokens = jest
      .spyOn(authLocalStore, 'getTokens')
      .mockReturnValueOnce({
        accessToken: 'accessToken.testMock',
        refreshToken: 'refreshToken.testMock',
      });
    const authServiceRefreshJwt = jest.spyOn(authService, 'refreshJwt');

    let userRequestCounter = 0;
    server.use(
      rest.get(jobQuestApiUrls.user.profile, (_req, res, ctx) => {
        userRequestCounter++;
        if (userRequestCounter === 1) return res(ctx.status(401));
        const data: UserProfileRes = {
          data: userProfileMock,
        };
        return res(ctx.json(data));
      })
    );

    await userService.profile();
    expect(authServiceRefreshJwt).toBeCalledTimes(1);
    expect(userRequestCounter).toEqual(2);
    // !!! similar as EXPECT blocks above !!!
    // 2 for user request(accessToken) & 1 for token refresh(refreshToken)
    expect(authLocalStoreGetTokens).toBeCalledTimes(3);
  });
});
