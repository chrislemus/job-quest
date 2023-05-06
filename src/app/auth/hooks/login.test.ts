import { renderHook, act } from '@testing-library/react';
import { useLogin } from './login.hook';
import { createWrapper } from '@tests/query-client';
import { mockRouter } from '@tests/next-navigation.mock';
import { logInMockCredentials } from '@api/job-quest/auth/auth.mocks';
import { dashboardUrl } from '@app/dashboard/constants';

test('successfully redirects to dashboard on success', async () => {
  const { result } = renderHook(() => useLogin(), { wrapper: createWrapper() });
  const login = result.current;
  expect(login).toBeTruthy();
  expect(typeof login.mutate).toBe('function');
  await act(async () => {
    await login.mutateAsync(logInMockCredentials);
  });
  expect(mockRouter.pathname).toEqual(dashboardUrl);
});
