import { renderHook } from '@testing-library/react';
import { useLogin } from './login.hook';
import { createWrapper } from '@tests/query-client';

test('should use mutation', () => {
  const { result } = renderHook(() => useLogin(), { wrapper: createWrapper() });
  const login = result.current;
  expect(login).toBeTruthy();
  expect(typeof login.mutate).toBe('function');
});
test.skip('caching tests', () => {});
