import { rest } from '@/tests/server';
import { jobQuestApiUrls } from '@/api/job-quest/job-quest-api-urls.const';
import { jwtMock } from './auth.mocks';
import {
  AuthSignUpRes,
  AuthLogInRes,
  AuthLogOutResDto,
  AuthRefreshJwtRes,
} from '@/api/job-quest/auth/dto';

export const authServiceHandlers = [
  rest.post(jobQuestApiUrls.auth.signup, (_req, res, ctx) => {
    const data: AuthSignUpRes = jwtMock;

    return res(ctx.json(data));
  }),
  rest.post(jobQuestApiUrls.auth.login, (_req, res, ctx) => {
    const data: AuthLogInRes = jwtMock;

    return res(ctx.json(data));
  }),
  rest.post(jobQuestApiUrls.auth.logout, (_req, res, ctx) => {
    const data = AuthLogOutResDto.parse(true);

    return res(ctx.json(data));
  }),
  rest.post(jobQuestApiUrls.auth.refresh, (_req, res, ctx) => {
    const data: AuthRefreshJwtRes = jwtMock;

    return res(ctx.json(data));
  }),
];
