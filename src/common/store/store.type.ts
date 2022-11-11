import { TypedUseSelectorHook } from 'react-redux';
import { store } from './store';

type State = ReturnType<typeof store.getState>;
export type UseSelector = TypedUseSelectorHook<State>;
export type UseDispatch = typeof store.dispatch;
