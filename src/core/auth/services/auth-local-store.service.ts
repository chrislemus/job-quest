import { JWT } from '../types';

const setTokens = (tokens: JWT) => {
  localStorage.setItem('user', JSON.stringify(tokens));
};

const getTokens = (): JWT | null => {
  const strObj = localStorage.getItem('user');
  return strObj === null ? null : (JSON.parse(strObj) as JWT);
};

const updateToken = (tokenName: keyof JWT, tokenValue: string) => {
  const tokens = getTokens();
  if (tokens) {
    tokens[tokenName] = tokenValue;
    localStorage.setItem('user', JSON.stringify(tokens));
  }
};

const removeTokens = () => {
  localStorage.removeItem('user');
};

export const authLocalStore = {
  setTokens,
  getTokens,
  updateToken,
  removeTokens,
};
