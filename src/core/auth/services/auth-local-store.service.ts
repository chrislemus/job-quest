import { JWT } from '../types';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const setTokens = (tokens: JWT) => {
  // TODO: set maxAge to match jwt expiry, once the implementation of additional data is added on backend
  const maxAge = 86400; // one day (in seconds);
  cookies.set('auth', tokens, { path: '/', maxAge });
};

const getTokens = (): JWT | null => {
  const tokens = cookies.get<JWT>('auth') || null;
  return tokens;
};

const updateToken = (tokenName: keyof JWT, tokenValue: string) => {
  const tokens = getTokens();
  if (tokens) {
    tokens[tokenName] = tokenValue;
    cookies.set('auth', tokens);
  }
};

const removeTokens = () => {
  cookies.remove('auth');
};

export const authLocalStore = {
  setTokens,
  getTokens,
  updateToken,
  removeTokens,
};
