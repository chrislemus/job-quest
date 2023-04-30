'use client';
import { usePathname, useRouter } from 'next/navigation';
import { PropsWithChildren, useEffect, useState } from 'react';
import { jobQuestApi } from '@api/job-quest';
import { dashboardUrl } from '@app/dashboard/constants';
import { authLoginUrl, authSignUpUrl } from '@app/auth/constants';
import { useInterval } from 'react-use';

export const intervalTime = 5000;
export const authenticateUrls = new Set<string>([authLoginUrl, authSignUpUrl]);

/**
 * Wraps child components and verifies if user has access to routes.
 */
export function RouterAuthGuard(p: PropsWithChildren<{}>) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    jobQuestApi.auth.isAuthenticated()
  );
  useInterval(() => {
    const latestAuthStatus = jobQuestApi.auth.isAuthenticated();
    const authChanged = isAuthenticated !== latestAuthStatus;
    // should only update once, when authentication changes.
    // Else it will get stuck pushing the same url in a loop.
    // an alternative would be to increase the interval time,
    // yet this still won't account for slow connections.
    if (authChanged) setIsAuthenticated(latestAuthStatus);
  }, intervalTime);

  useEffect(() => {
    const inDashboard = pathname?.startsWith(dashboardUrl);

    if (isAuthenticated && !inDashboard) {
      const shouldRedirect = authenticateUrls.has(pathname || '');
      if (shouldRedirect) router?.push(dashboardUrl);
    } else if (!isAuthenticated && inDashboard) {
      router?.push('/auth/login');
    }
  }, [isAuthenticated]);

  return <>{p.children}</>;
}
