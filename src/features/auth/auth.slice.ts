import { usePathname, useRouter } from 'next/navigation';
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';
import { authService } from './auth.service';

const initialState = {
  isAuthenticated: false,
  // login: authService.login,
  // logout: authService.logout,
};

type AuthState = typeof initialState;

export const AuthProvider = (p: PropsWithChildren<{}>) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // const validateUserAuth = () => {
  //   const tokens = authService.getTokens();
  //   setIsAuthenticated(!!tokens);
  // };

  // useEffect(validateUserAuth, []);

  // const login = (email: string, password: string) =>
  //   authService.login(email, password).then((res) => {
  //     setIsAuthenticated(true);
  //     return res;
  //   });

  // const logout = () =>
  //   authService.logout().then((res) => {
  //     validateUserAuth();
  //     return res;
  //   });

  useEffect(() => {
    const dashboardUrl = '/dashboard';
    const inDashboard = pathname.startsWith(dashboardUrl);
    if (isAuthenticated && !inDashboard) {
      router.push(dashboardUrl);
    } else if (!isAuthenticated && inDashboard) {
      router.push('/?login=true');
    }
  }, [isAuthenticated]);
};

import { createSlice } from '@reduxjs/toolkit';
import { authLocalStore } from './auth-local.store';
// import type { PayloadAction } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    refreshAuthStatus: (state) => {
      state.isAuthenticated = !!authLocalStore.getTokens();
    },
    // login: (
    //   state,
    //   action: PayloadAction<{ email: string; password: string }>
    // ) => {
    //   const p = action.payload;
    //   authService.login(p.email, p.password).then((res) => {
    //     state.isAuthenticated = true;
    //     return res;
    //   });
    // },
    // logout: (state) => {
    //   authService.logout().then((res) => {
    //     const tokens = authLocalStore.getTokens();
    //     state.isAuthenticated = !!tokens;
    //     return res;
    //   });
    // },
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload;
    // },
  },
});

// Action creators are generated for each case reducer function
export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;
