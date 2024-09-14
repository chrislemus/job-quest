import { rest } from '@/tests/server';
import { authDataApiUrlConstant } from './auth-data-api-url.constant';
import { jwtMock } from './mocks';
import {
  AuthSignUpResBodyDto,
  AuthLogInResBodyDto,
  AuthRefreshJwtResBodyDto,
} from '@/app/auth/services/auth-data/dto';

export const authDataServiceHandlers = [
  rest.post(authDataApiUrlConstant.signup, (_req, res, ctx) => {
    const data: AuthSignUpResBodyDto = jwtMock;

    return res(ctx.json(data));
  }),
  rest.post(authDataApiUrlConstant.login, (_req, res, ctx) => {
    const data: AuthLogInResBodyDto = jwtMock;

    return res(ctx.json(data));
  }),
  rest.post(authDataApiUrlConstant.logout, (_req, res, ctx) => {
    return res(ctx.json({}));
  }),
  rest.post(authDataApiUrlConstant.refresh, (_req, res, ctx) => {
    const data: AuthRefreshJwtResBodyDto = jwtMock;

    return res(ctx.json(data));
  }),
];
