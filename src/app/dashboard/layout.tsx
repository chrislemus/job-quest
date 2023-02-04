'use client';
import { Container } from '@common/ui/atoms';
import { RouterAuthGuard } from '@app/auth/ui';
import { PropsWithChildren } from 'react';
import { DashboardNav } from './ui';
import { Provider } from 'react-redux';
import { store } from './store';
import { Toast } from './toast/toast';

export default function Layout(p: PropsWithChildren<{}>) {
  return (
    <Provider store={store}>
      <Toast />
      <RouterAuthGuard>
        <div>
          <DashboardNav />
          <Container
            maxWidth={false}
            component="main"
            style={{ paddingTop: '1rem' }}
          >
            {p.children}
          </Container>
        </div>
      </RouterAuthGuard>
    </Provider>
  );
}
