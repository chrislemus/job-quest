import { renderHook } from '@testing-library/react';
import { createWrapper } from '@tests/query-client';
import { useSignUp } from './signup.hook';

test('should use mutation', () => {
  const { result } = renderHook(() => useSignUp(), {
    wrapper: createWrapper(),
  });
  const signUp = result.current;
  expect(signUp).toBeTruthy();
  expect(typeof signUp.mutate).toBe('function');
});
test.skip('caching tests', () => {});
