import { renderHook } from '@testing-library/react';
import { createWrapper } from '@tests/query-client';
import { useLogout } from './logout.hook';
import { useRouterMock } from '@tests/next-navigation.mock';
import { authLoginUrl } from '../constants';

test('should use mutation', async () => {
  let pushUrl = '';
  useRouterMock.push.mockImplementation((url) => {
    pushUrl = url;
  });

  const { result } = renderHook(() => useLogout(), {
    wrapper: createWrapper(),
  });
  const logout = result.current;
  expect(logout).toBeTruthy();
  await logout.mutateAsync();
  expect(pushUrl).toEqual(authLoginUrl);
});
