'use client';
import { RouterAuthGuard } from '@app/auth/ui';
import { PropsWithChildren } from 'react';
import { DashboardNav } from './ui';
import { Toast } from './toast/toast';
import { DashboardStoreProvider } from './store/store.provider';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export default function Layout(p: PropsWithChildren<{}>) {
  return (
    <DashboardStoreProvider>
      <Toast />
      <RouterAuthGuard>
        <ReactQueryDevtools initialIsOpen={false} />

        <div className="flex flex-col h-screen">
          <div>
            <DashboardNav />
          </div>

          <div className="grow overflow-x-auto pt-4">{p.children}</div>
        </div>
      </RouterAuthGuard>
    </DashboardStoreProvider>
  );
}
