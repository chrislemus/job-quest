import { configureStore } from '@reduxjs/toolkit';
import { _authReducer } from '@core/auth/store';

export const store = configureStore({
  reducer: {
    auth: _authReducer,
  },
});
