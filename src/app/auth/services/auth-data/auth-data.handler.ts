import { authDataApiUrlConstant } from './auth-data-api-url.constant';
import { jwtMock } from './mocks';
import { http, HttpResponse } from 'msw';
import {
  AuthSignUpResBodyDto,
  AuthLogInResBodyDto,
  AuthRefreshJwtResBodyDto,
} from '@/app/auth/services/auth-data/dto';

export const authDataServiceHandlers = [
  http.post(authDataApiUrlConstant.signup, () => {
    const data: AuthSignUpResBodyDto = jwtMock;

    return HttpResponse.json(data);
  }),
  http.post(authDataApiUrlConstant.login, () => {
    const data: AuthLogInResBodyDto = jwtMock;

    return HttpResponse.json(data);
  }),
  http.post(authDataApiUrlConstant.logout, () => {
    return HttpResponse.json({});
  }),
  http.post(authDataApiUrlConstant.refresh, () => {
    const data: AuthRefreshJwtResBodyDto = jwtMock;

    return HttpResponse.json(data);
  }),
];
