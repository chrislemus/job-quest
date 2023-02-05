import { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';

export function DashboardStoreProvider(p: PropsWithChildren<{}>) {
  return <Provider store={store}>{p.children}</Provider>;
}
