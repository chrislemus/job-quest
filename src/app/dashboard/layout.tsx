'use client';
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
          <div className="p-5">{p.children}</div>
        </div>
      </RouterAuthGuard>
    </DashboardStoreProvider>
  );
}
