'use client';
import { usePathname, useRouter } from 'next/navigation';
import { PropsWithChildren, useEffect, useState } from 'react';
import { dashboardUrl } from '@/app/dashboard/constants';
import { authSiteUrlConfig } from '@/app/auth/configs';
import { useInterval } from 'react-use';
import { authDataService } from '../services';

export const intervalTime = 5000;
export const authenticateUrls = new Set<string>([
  authSiteUrlConfig.login,
  authSiteUrlConfig.signUp,
]);

/**
 * Wraps child components and verifies if user has access to routes.
 */
export function RouterAuthGuard(p: PropsWithChildren<{}>) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    authDataService.isAuthenticated()
  );
  useInterval(() => {
    const latestAuthStatus = authDataService.isAuthenticated();
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
      router?.push(authSiteUrlConfig.login);
    }
  }, [isAuthenticated]);

  return <>{p.children}</>;
}
