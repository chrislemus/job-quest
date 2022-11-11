'use client';
import { DashboardNav } from '@common/ui/organisms';
import { RouterAuthGuard } from '@core/auth/ui';
import { PropsWithChildren } from 'react';

export default function Layout(p: PropsWithChildren<{}>) {
  return (
    <RouterAuthGuard>
      <div className="has-background-white-bis">
        <DashboardNav />
        {p.children}
      </div>
    </RouterAuthGuard>
  );
}
