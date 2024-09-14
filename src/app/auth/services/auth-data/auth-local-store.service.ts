import Cookies from 'universal-cookie';
import { JwtDto } from '@/app/auth/services/auth-data/dto';

const cookies = new Cookies();
export const authCookieKey = 'userAuth';

function setTokens(tokens: JwtDto) {
  // TODO: set maxAge to match jwt expiry, once the implementation of additional data is added on backend
  const maxAge = 86400; // one day (in seconds);
  cookies.set(authCookieKey, tokens, { path: '/', maxAge });
}

function getTokens(): JwtDto | null {
  const tokens = cookies.get<JwtDto>(authCookieKey) || null;
  return tokens;
}

function removeTokens() {
  cookies.remove(authCookieKey, { path: '/' });
}

export const authLocalStore = {
  setTokens,
  getTokens,
  removeTokens,
};
