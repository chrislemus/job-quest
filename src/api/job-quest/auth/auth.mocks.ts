import { AuthSignUpArgs, AuthLogInArgs } from '@api/job-quest/auth/types';
import { JWT } from './dto';

export const jwtMock: JWT = {
  accessToken: 'accessToken.pifwpiu',
  refreshToken: 'refreshToken.fwqefqw',
};

export const signUpMockCredentials: AuthSignUpArgs = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@me.com',
  password: 'hello123',
};

export const logInMockCredentials: AuthLogInArgs = {
  email: 'john@me.com',
  password: 'hello123',
};
