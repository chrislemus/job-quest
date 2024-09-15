import { server, rest } from '@/tests/server';
import { authDataService } from './auth-data.service';
import { userService } from '@/app/user/services/user-data/user-data.service';
import { authLocalStore } from './auth-local-store.service';
import { userProfileMock } from '@/app/user/services/user-data/mocks/user.mock';
import { UserProfileDto } from '@/app/user/services/user-data/dto';
import { authLogInReqBodyMock, authSignupReqBodyMock } from './mocks';
import { authDataApiUrlConstant } from './auth-data-api-url.constant';
import {
  AuthSignUpResBodyDto,
  AuthLogInResBodyDto,
  AuthRefreshJwtResBodyDto,
} from '@/app/auth/services/auth-data/dto';
import { userDataApiUrlConstant } from '@/app/user/services/user-data/user-data-api-url.constant';

afterEach(() => {
  jest.resetAllMocks();
});

describe('AuthService', () => {
  test('signup() contains valid global server handlers', async () => {
    const res = await authDataService.signup({ body: authSignupReqBodyMock });
    AuthSignUpResBodyDto.parse(res);
  });

  test('signup() validates response data', async () => {
    // return invalid response data
    server.use(
      rest.post(authDataApiUrlConstant.signup, (_req, res, ctx) => {
        return res(ctx.json({}));
      })
    );

    let error = false;
    await authDataService
      .signup({ body: authSignupReqBodyMock })
      .catch((_e: any) => (error = true));

    expect(error).toBeTruthy();
  });

  test('login() contains valid global server handlers', async () => {
    const res = await authDataService.login({ body: authLogInReqBodyMock });
    AuthLogInResBodyDto.parse(res);
  });

  test('login() validates response data', async () => {
    // return invalid response data
    server.use(
      rest.post(authDataApiUrlConstant.login, (_req, res, ctx) => {
        return res(ctx.json({}));
      })
    );

    let error = false;
    await authDataService
      .login({ body: authLogInReqBodyMock })
      .catch((_e: any) => (error = true));

    expect(error).toBeTruthy();
  });

  test('logout() contains valid global server handlers', async () => {
    try {
      await authDataService.logout();
      expect('successLogout').toBeTruthy();
    } catch (error) {
      expect('successLogout').toBeFalsy(); // should not reach here
    }
  });

  test('logout() validates response data', async () => {
    // return invalid response data
    server.use(
      rest.post(authDataApiUrlConstant.logout, (_req, res, ctx) => {
        return res(ctx.status(401));
      })
    );

    try {
      await authDataService.logout();
      expect('successLogout').toEqual(false); // should not reach here
    } catch (error) {
      expect('failedLogout').toBeTruthy();
    }
  });

  test('refresh() contains valid global server handlers', async () => {
    const res = await authDataService.refreshJwt();
    AuthRefreshJwtResBodyDto.parse(res);
  });

  test('refresh() validates response data', async () => {
    // return invalid response data
    server.use(
      rest.post(authDataApiUrlConstant.refresh, (_req, res, ctx) => {
        return res(ctx.json({}));
      })
    );

    let error = false;
    await authDataService.refreshJwt().catch((_e: any) => (error = true));
    expect('failedLogout').toBeTruthy();
  });

  test('refresh() should try to refresh token once', async () => {
    jest
      .spyOn(authDataService, 'isAuthenticated')
      .mockImplementation(() => true);
    const authLocalStoreGetTokens = jest.spyOn(authLocalStore, 'getTokens');
    const authLocalStoreRemoveTokens = jest.spyOn(
      authLocalStore,
      'removeTokens'
    );

    let userRequestCounter = 0;
    server.use(
      rest.get(userDataApiUrlConstant.profile, (_req, res, ctx) => {
        userRequestCounter++;
        return res(ctx.status(401));
      })
    );

    let refreshRequestCounter = 0;
    server.use(
      rest.post(authDataApiUrlConstant.refresh, (_req, res, ctx) => {
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
    jest
      .spyOn(authDataService, 'isAuthenticated')
      .mockImplementation(() => true);
    const authLocalStoreGetTokens = jest
      .spyOn(authLocalStore, 'getTokens')
      .mockReturnValueOnce({
        accessToken: 'accessToken.testMock',
        refreshToken: 'refreshToken.testMock',
      });
    const authServiceRefreshJwt = jest.spyOn(authDataService, 'refreshJwt');

    let userRequestCounter = 0;
    server.use(
      rest.get(userDataApiUrlConstant.profile, (_req, res, ctx) => {
        userRequestCounter++;
        if (userRequestCounter === 1) return res(ctx.status(401));
        const data: UserProfileDto = userProfileMock;
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
