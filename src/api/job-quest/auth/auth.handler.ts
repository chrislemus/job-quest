import { rest } from '@/tests/server';
import { jobQuestApiUrls } from '@/api/job-quest/job-quest-api-urls.const';
import { jwtMock } from './auth.mocks';
import {
  AuthSignUpRes,
  AuthLogInRes,
  AuthLogOutRes,
  AuthRefreshJwtRes,
} from '@/api/job-quest/auth/dto';

export const authServiceHandlers = [
  rest.post(jobQuestApiUrls.auth.signup, (_req, res, ctx) => {
    const data: AuthSignUpRes = {
      data: jwtMock,
    };

    return res(ctx.json(data));
  }),
  rest.post(jobQuestApiUrls.auth.login, (_req, res, ctx) => {
    const data: AuthLogInRes = {
      data: jwtMock,
    };

    return res(ctx.json(data));
  }),
  rest.post(jobQuestApiUrls.auth.logout, (_req, res, ctx) => {
    const data: AuthLogOutRes = {
      data: true,
    };

    return res(ctx.json(data));
  }),
  rest.post(jobQuestApiUrls.auth.refresh, (_req, res, ctx) => {
    const data: AuthRefreshJwtRes = {
      data: jwtMock,
    };

    return res(ctx.json(data));
  }),
];
