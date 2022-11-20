'use client';
import { Button, Container } from '@common/ui/atoms';
import { DashboardNav } from '@common/ui/organisms';
import { RouterAuthGuard } from '@core/auth/ui';
import { PropsWithChildren } from 'react';
import { usePathname } from 'next/navigation';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { TouchBackend } from 'react-dnd-touch-backend';

import Link from 'next/link';

export default function Layout(p: PropsWithChildren<{}>) {
  const pathName = usePathname();

  return (
    <RouterAuthGuard>
      <DndProvider backend={TouchBackend} options={{ enableMouseEvents: true }}>
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
      </DndProvider>
    </RouterAuthGuard>
  );
}
