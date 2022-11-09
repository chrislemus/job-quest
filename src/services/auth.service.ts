import { apiService } from './api.service';
import { tokenService } from './token.service';

const register = (email: string, password: string) => {
  return apiService.post('/auth/signup', { email, password });
};

const login = (email: string, password: string) => {
  return apiService.post('/auth/login', { email, password }).then((res) => {
    if (res.data?.access_token) {
      tokenService.setUser(res.data);
    }
    return res.data;
  });
};

const logout = () => tokenService.removeUser();

const getCurrentUser = () => tokenService.getUser();

export const authService = {
  register,
  login,
  logout,
  getCurrentUser,
};
