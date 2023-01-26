'use client';
import { Button } from '@common/ui/atoms';
import { RouterAuthGuard } from '@app/auth/_ui';
import { PropsWithChildren } from 'react';
import { usePathname } from 'next/navigation';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { DashboardNav } from './_ui';
import Link from 'next/link';

export default function Layout(p: PropsWithChildren<{}>) {
  const pathName = usePathname();

  return (
    <RouterAuthGuard>
      <DashboardNav />
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
    </RouterAuthGuard>
  );
}
