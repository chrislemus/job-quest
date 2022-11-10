export type AuthUser = {
  access_token: string;
  refresh_token: string;
};

const updateLocalAccessToken = (token: string) => {
  const user = getAuthUser();
  if (user) {
    user.access_token = token;
    localStorage.setItem('user', JSON.stringify(user));
  }
};

const getAuthUser = (): AuthUser | null => {
  const strObj = localStorage.getItem('user');
  return strObj === null ? null : (JSON.parse(strObj) as AuthUser);
};

const setUser = (user: { access_token: string; refresh_token: string }) => {
  localStorage.setItem('user', JSON.stringify(user));
};

const removeUser = () => {
  localStorage.removeItem('user');
};

export const tokenService = {
  updateLocalAccessToken,
  getAuthUser,
  setUser,
  removeUser,
};
