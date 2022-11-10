import { usePathname, useRouter } from 'next/navigation';
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';
import { authLocalStore } from './auth-local.store';
import { authService } from './auth.service';

const initialState = {
  isAuthenticated: false,
  login: authService.login,
  logout: authService.logout,
};

const AuthContext = createContext(initialState);

export const useAuthCtx = () => useContext(AuthContext);

export const AuthProvider = (p: PropsWithChildren<{}>) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const validateUserAuth = () => {
    const tokens = authLocalStore.getTokens();
    setIsAuthenticated(!!tokens);
  };

  useEffect(validateUserAuth, []);

  const login = (email: string, password: string) =>
    authService.login(email, password).then((res) => {
      setIsAuthenticated(true);
      return res;
    });

  const logout = () =>
    authService.logout().then((res) => {
      validateUserAuth();
      return res;
    });

  // useEffect(() => {
  //   const dashboardUrl = '/dashboard';
  //   const inDashboard = pathname.startsWith(dashboardUrl);
  //   if (isAuthenticated && !inDashboard) {
  //     router.push(dashboardUrl);
  //   } else if (!isAuthenticated && inDashboard) {
  //     router.push('/?login=true');
  //   }
  // }, [isAuthenticated]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {p.children}
    </AuthContext.Provider>
  );
};
