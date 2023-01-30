'use client';
import { usePathname, useRouter } from 'next/navigation';
import { PropsWithChildren, useEffect, useState } from 'react';
import { jobQuestApi } from '@api/job-quest';

/**
 * Wraps child components and verifies if user has access to routes.
 */
export function RouterAuthGuard(p: PropsWithChildren<{}>) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const interval = setInterval(() => {
      const latestAuthStatus = jobQuestApi.auth.isAuthenticated();
      if (latestAuthStatus !== isAuthenticated)
        setIsAuthenticated(latestAuthStatus);
    }, 500);

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
        router?.push('/auth/login');
      }
    }
  }, [isAuthenticated]);
  return <>{p.children}</>;
}
