'use client';

import { PropsWithChildren } from 'react';
import { authSiteUrlConfig } from '@/app/auth/configs';
import { AuthProvider } from 'react-oidc-context';
import { useOAuthConfig } from '../hooks';

export const intervalTime = 5000;
export const authenticateUrls = new Set<string>([
  authSiteUrlConfig.login,
  authSiteUrlConfig.signUp,
]);

/**
 * Wraps child components and verifies if user has access to routes.
 */
export function RouterAuthGuard(p: PropsWithChildren<{}>) {
  const { client_id, authority, redirect_uri } = useOAuthConfig();

  return (
    <AuthProvider
      scope="email openid phone"
      response_type="code"
      client_id={client_id}
      authority={authority}
      redirect_uri={redirect_uri}
    >
      <RouterAuthGuardInternal>{p.children}</RouterAuthGuardInternal>
    </AuthProvider>
  );
}
export function RouterAuthGuardInternal(p: PropsWithChildren<{}>) {
  // const router = useRouter();
  // const pathname = usePathname();
  // console.log({ pathname });

  // if (!url) {
  //   throw new Error('NEXT_PUBLIC_JOB_QUEST_API_ROOT_URL is not defined');
  // }
  // const router = useRouter();
  // const pathname = usePathname();
  // const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
  //   authDataService.isAuthenticated()
  // );
  // useInterval(() => {
  //   const latestAuthStatus = authDataService.isAuthenticated();
  //   const authChanged = isAuthenticated !== latestAuthStatus;
  //   // should only update once, when authentication changes.
  //   // Else it will get stuck pushing the same url in a loop.
  //   // an alternative would be to increase the interval time,
  //   // yet this still won't account for slow connections.
  //   if (authChanged) setIsAuthenticated(latestAuthStatus);
  // }, intervalTime);

  // useEffect(() => {
  //   const inDashboard = pathname?.startsWith(dashboardUrl);

  //   if (isAuthenticated && !inDashboard) {
  //     const shouldRedirect = authenticateUrls.has(pathname || '');
  //     if (shouldRedirect) router?.push(dashboardUrl);
  //   } else if (!isAuthenticated && inDashboard) {
  //     router?.push(authSiteUrlConfig.login);
  //   }
  // }, [isAuthenticated]);

  return p.children;
}
