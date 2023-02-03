'use client';
import { Container } from '@common/ui/atoms';
import { RouterAuthGuard } from '@app/auth/ui';
import { PropsWithChildren } from 'react';
import { DashboardNav } from './ui';

export default function Layout(p: PropsWithChildren<{}>) {
  return (
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
  );
}
