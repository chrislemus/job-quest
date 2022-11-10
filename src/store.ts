import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { counterReducer } from '@src/features/counter';
import { EqualityFn } from 'react-redux';
import { useSelector as _useSelector } from 'react-redux';
import { authReducer } from './features/auth/auth.slice';
import { pokemonApi } from './features/pokemon';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
type RootState = ReturnType<typeof store.getState>;

export const useSelector: <Selected = unknown>(
  selector: (state: RootState) => Selected,
  equalityFn?: EqualityFn<Selected> | undefined
) => Selected = (selector, equalityFn) => _useSelector(selector, equalityFn);
