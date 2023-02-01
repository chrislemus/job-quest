'use client';
import { usePathname, useRouter } from 'next/navigation';
import { PropsWithChildren, useEffect } from 'react';
import { jobQuestApi } from '@api/job-quest';

export const intervalTime = 500;
export const authenticateUrls = new Set<string>([
  '/auth/login',
  '/auth/signup',
]);

/**
 * Wraps child components and verifies if user has access to routes.
 */
export function RouterAuthGuard(p: PropsWithChildren<{}>) {
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    function authRedirect() {
      const isAuthenticated = jobQuestApi.auth.isAuthenticated();
      const dashboardUrl = '/dashboard';
      const inDashboard = pathname?.startsWith(dashboardUrl);

      if (isAuthenticated && !inDashboard) {
        const shouldRedirect = authenticateUrls.has(pathname || '');
        if (shouldRedirect) router?.push(dashboardUrl);
      } else if (!isAuthenticated && inDashboard) {
        router?.push('/auth/login');
      }
    }
    authRedirect();
    const interval = setInterval(authRedirect, intervalTime);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return <>{p.children}</>;
}
