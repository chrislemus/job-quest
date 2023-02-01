import { renderHook } from '@testing-library/react';
import { createWrapper } from '@tests/query-client';
import { useLogout } from './logout.hook';

test('should use mutation', () => {
  const { result } = renderHook(() => useLogout(), {
    wrapper: createWrapper(),
  });
  const logout = result.current;
  expect(logout).toBeTruthy();
  expect(typeof logout.mutate).toBe('function');
});
