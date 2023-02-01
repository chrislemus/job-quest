import { signUpMockCredentials } from '@api/job-quest/auth/auth.mocks';
import { dashboardUrl } from '@app/dashboard/constants';
import { renderHook } from '@testing-library/react';
import { useRouterMock } from '@tests/next-navigation.mock';
import { createWrapper } from '@tests/query-client';
import { useSignUp } from './signup.hook';

test('successfully redirects to dashboard on success', async () => {
  let pushUrl = '';
  useRouterMock.push.mockImplementation((url) => {
    pushUrl = url;
  });

  const { result } = renderHook(() => useSignUp(), {
    wrapper: createWrapper(),
  });
  const signUp = result.current;
  expect(signUp).toBeTruthy();
  await signUp.mutateAsync(signUpMockCredentials);
  expect(pushUrl).toEqual(dashboardUrl);
});
