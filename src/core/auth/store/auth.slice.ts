import { createSlice } from '@reduxjs/toolkit';
import { authLocalStore } from '../services/auth-local-store.service';
import { initialState } from './initial-state.const';

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    refreshAuthStatus: (state) => {
      state.isAuthenticated = !!authLocalStore.getTokens();
    },
  },
});
