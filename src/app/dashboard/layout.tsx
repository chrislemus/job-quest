'use client';
import { Button, Container } from '@common/ui/atoms';
import { DashboardNav } from '@common/ui/organisms';
import { RouterAuthGuard } from '@core/auth/ui';
import { PropsWithChildren } from 'react';
import { usePathname } from 'next/navigation';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Link from 'next/link';

export default function Layout(p: PropsWithChildren<{}>) {
  const pathName = usePathname();

  return (
    <RouterAuthGuard>
      <div>
        <DashboardNav />
        <Container
          maxWidth={false}
          component="main"
          style={{ paddingTop: '1rem' }}
        >
          {pathName !== '/dashboard' && (
            <Button
              href="/dashboard"
              startIcon={<ArrowBackIosIcon />}
              LinkComponent={Link}
            >
              Back
            </Button>
          )}
          {p.children}
        </Container>
      </div>
    </RouterAuthGuard>
  );
}
