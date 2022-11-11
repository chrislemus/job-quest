import { authSlice } from './auth.slice';

export const _authReducer = authSlice.reducer;
export const { refreshAuthStatus } = authSlice.actions;
