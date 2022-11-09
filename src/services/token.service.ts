type Tokens = {
  access_token: string;
  refresh_token: string;
};

const getLocalUser = (): Tokens | null => {
  const strObj = localStorage.getItem('user');
  return strObj === null ? null : (JSON.parse(strObj) as Tokens);
};

const getLocalRefreshToken = () => {
  return getLocalUser()?.refresh_token;
};

const getLocalAccessToken = () => {
  return getLocalUser()?.access_token;
};

const updateLocalAccessToken = (token: string) => {
  const user = getLocalUser();
  if (user) {
    user.access_token = token;
    localStorage.setItem('user', JSON.stringify(user));
  }
};

const getUser = () => getLocalUser();

const setUser = (user: { access_token: string; refresh_token: string }) => {
  localStorage.setItem('user', JSON.stringify(user));
};

const removeUser = () => {
  localStorage.removeItem('user');
};

export const tokenService = {
  getLocalRefreshToken,
  getLocalAccessToken,
  updateLocalAccessToken,
  getUser,
  setUser,
  removeUser,
};
