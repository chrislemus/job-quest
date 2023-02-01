import { renderHook } from '@testing-library/react';
import { useLogin } from './login.hook';
import { createWrapper } from '@tests/query-client';
import { useRouterMock } from '@tests/next-navigation.mock';
import { logInMockCredentials } from '@api/job-quest/auth/auth.mocks';
import { dashboardUrl } from '@app/dashboard/constants';

test('successfully redirects to dashboard on success', async () => {
  let pushUrl = '';
  useRouterMock.push.mockImplementation((url) => {
    pushUrl = url;
  });

  const { result } = renderHook(() => useLogin(), { wrapper: createWrapper() });
  const login = result.current;
  expect(login).toBeTruthy();
  expect(typeof login.mutate).toBe('function');
  await login.mutateAsync(logInMockCredentials);
  expect(pushUrl).toEqual(dashboardUrl);
});
test.skip('caching tests', () => {});
