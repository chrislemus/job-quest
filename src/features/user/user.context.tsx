import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { createContext, PropsWithChildren, useContext } from 'react';
import { useAuthCtx } from '../auth';
import { userService } from './user.service';

const initialState = { profile: {} as any };

const UserContext = createContext<{
  profile: UseQueryResult<
    {
      id: number;
      email: string;
    },
    unknown
  >;
}>(initialState);

export const useUserCtx = () => useContext(UserContext);

export const UserProvider = (p: PropsWithChildren<{}>) => {
  const authCtx = useAuthCtx();
  const profile = useQuery({
    queryFn: userService.getProfile,
    queryKey: ['user', 'profile'],
    enabled: authCtx.isAuthenticated,
  });

  return (
    <UserContext.Provider value={{ profile }}>
      {p.children}
    </UserContext.Provider>
  );
};
