import { act, renderHook } from '@testing-library/react';
import { createWrapper } from '@/tests/query-client';
import { useLogout } from './logout.hook';
import { mockRouter } from '@/tests/next-navigation.mock';
import { authLoginUrl } from '@/app/auth/constants';

test('should use mutation', async () => {
  const { result } = renderHook(() => useLogout(), {
    wrapper: createWrapper(),
  });
  const logout = result.current;
  expect(logout).toBeTruthy();

  await act(async () => {
    await logout.mutateAsync();
  });
  expect(mockRouter.pathname).toEqual(authLoginUrl);
});
