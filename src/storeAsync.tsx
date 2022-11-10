import { User } from '@app/dto';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { authActions } from './features/auth/auth.slice';
import { authService } from '@src/features/auth';
import { userService } from '@src/features/user/user.service';
import { useSelector } from './store';

export const storeAsync = {
  auth: {
    login: () => {
      const dispatch = useDispatch();

      const mutation = useMutation<AxiosResponse, AxiosError, User, unknown>({
        mutationKey: ['authService.login'],
        mutationFn: (user: { email: string; password: string }) =>
          authService.login(user.email, user.password),
      });

      const refreshAuthStatus = () => dispatch(authActions.refreshAuthStatus());

      useEffect(() => {
        if (mutation.isSuccess) refreshAuthStatus();
      }, [mutation.isSuccess]);

      useEffect(() => {
        refreshAuthStatus();
      }, []);

      return mutation;
    },
    logout: () => {
      const dispatch = useDispatch();

      const mutation = useMutation({
        mutationKey: ['authService.logout'],
        mutationFn: authService.logout,
      });

      useEffect(() => {
        if (mutation.isSuccess) {
          dispatch(authActions.refreshAuthStatus());
        }
      }, [mutation.isSuccess]);

      return mutation;
    },
  },
  user: {
    profile: () => {
      const auth = useSelector((store) => store.auth);

      const profile = useQuery({
        queryFn: userService.getProfile,
        queryKey: ['userService.getProfile'],
        enabled: auth.isAuthenticated,
      });

      return profile;
    },
  },
};
