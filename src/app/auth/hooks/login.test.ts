import { renderHook, act } from '@testing-library/react';
import { useLogin } from './login.hook';
import { createWrapper } from '@/tests/query-client';
import { mockRouter } from '@/tests/next-navigation.mock';
import { dashboardUrl } from '@/app/dashboard/constants';
import { authLogInReqBodyMock } from '../services/auth-data/mocks';

test('successfully redirects to dashboard on success', async () => {
  const { result } = renderHook(() => useLogin(), { wrapper: createWrapper() });
  const login = result.current;
  expect(login).toBeTruthy();
  expect(typeof login.mutate).toBe('function');
  await act(async () => {
    await login.mutateAsync(authLogInReqBodyMock);
  });
  expect(mockRouter.pathname).toEqual(dashboardUrl);
});
