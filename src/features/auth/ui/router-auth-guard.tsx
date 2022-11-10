import { useSelector } from '@root/src/store';
import { usePathname, useRouter } from 'next/navigation';
import { PropsWithChildren, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { authActions } from '../auth.slice';

export function RouterAuthGuard(p: PropsWithChildren<{}>) {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  // const dispatch = useDispatch();
  // const refreshAuthStatus = () => {
  //   dispatch(authActions.refreshAuthStatus());
  // };

  const router = useRouter();
  const pathname = usePathname();

  // useEffect(refreshAuthStatus, []);

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
