import { renderHook } from '@testing-library/react';
import { useLogin } from './login.hook';

test('should use counter', () => {
  const login = renderHook(() => useLogin());

  expect(login).toBe(0);
  // expect(typeof result.current.increment).toBe('function');
});
