import { useSelector } from '@common/store';
import { usePathname, useRouter } from 'next/navigation';
import { PropsWithChildren, useEffect } from 'react';

export function RouterAuthGuard(p: PropsWithChildren<{}>) {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const dashboardUrl = '/dashboard';
    const inDashboard = pathname?.startsWith(dashboardUrl);
    if (isAuthenticated && !inDashboard) {
      router?.push(dashboardUrl);
    } else if (!isAuthenticated && inDashboard) {
      router?.push('/?login=true');
    }
  }, [isAuthenticated]);
  return <>{p.children}</>;
}
