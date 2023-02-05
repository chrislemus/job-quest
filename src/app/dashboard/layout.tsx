'use client';
import { Container } from '@common/ui/atoms';
import { RouterAuthGuard } from '@app/auth/ui';
import { PropsWithChildren } from 'react';
import { DashboardNav } from './ui';
import { Toast } from './toast/toast';
import { DashboardStoreProvider } from './store/store.provider';

export default function Layout(p: PropsWithChildren<{}>) {
  return (
    <DashboardStoreProvider>
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
    </DashboardStoreProvider>
  );
}
