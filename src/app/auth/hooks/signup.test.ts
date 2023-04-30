import { signUpMockCredentials } from '@api/job-quest/auth/auth.mocks';
import { dashboardUrl } from '@app/dashboard/constants';
import { renderHook, act } from '@testing-library/react';
import { mockRouter } from '@tests/next-navigation.mock';
import { createWrapper } from '@tests/query-client';
import { useSignUp } from './signup.hook';

test('successfully redirects to dashboard on success', async () => {
  const { result } = renderHook(() => useSignUp(), {
    wrapper: createWrapper(),
  });
  const signUp = result.current;
  expect(signUp).toBeTruthy();
  await act(async () => {
    await signUp.mutateAsync(signUpMockCredentials);
  });
  expect(mockRouter.pathname).toEqual(dashboardUrl);
});
