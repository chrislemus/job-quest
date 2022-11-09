import { apiService } from './api.service';

const getProfile = () => {
  return apiService.get('/auth/profile').then(({ data }) => data);
};

export const userService = {
  getProfile,
};
