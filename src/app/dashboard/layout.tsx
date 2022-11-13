'use client';
import { DashboardNav } from '@common/ui/organisms';
import { RouterAuthGuard } from '@core/auth/ui';
import { PropsWithChildren } from 'react';

export default function Layout(p: PropsWithChildren<{}>) {
  return (
    // <RouterAuthGuard>
    <div>
      <DashboardNav />
      {p.children}
    </div>
    // </RouterAuthGuard>
  );
}
