'use client';
import { usePathname, useRouter } from 'next/navigation';
import { PropsWithChildren, useEffect, useState } from 'react';
import { authService } from '../services';

export function RouterAuthGuard(p: PropsWithChildren<{}>) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const interval = setInterval(() => {
      const latestAuthStatus = authService.isAuthenticated();
      if (latestAuthStatus !== isAuthenticated)
        setIsAuthenticated(latestAuthStatus);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (isAuthenticated !== null) {
      const dashboardUrl = '/dashboard';
      const inDashboard = pathname?.startsWith(dashboardUrl);

      if (isAuthenticated) {
        if (!inDashboard) router?.push(dashboardUrl);
      } else if (!isAuthenticated && inDashboard) {
        router?.push('/?login=true');
      }
    }
  }, [isAuthenticated]);
  return <>{p.children}</>;
}
