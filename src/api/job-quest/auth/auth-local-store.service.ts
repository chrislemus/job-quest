import Cookies from 'universal-cookie';
import { JWT } from '@/api/job-quest/auth/dto';

const cookies = new Cookies();
export const authCookieKey = 'userAuth';

function setTokens(tokens: JWT) {
  // TODO: set maxAge to match jwt expiry, once the implementation of additional data is added on backend
  const maxAge = 86400; // one day (in seconds);
  cookies.set(authCookieKey, tokens, { path: '/', maxAge });
}

function getTokens(): JWT | null {
  const tokens = cookies.get<JWT>(authCookieKey) || null;
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
