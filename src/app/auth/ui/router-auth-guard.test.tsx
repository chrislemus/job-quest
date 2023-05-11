import { render } from '@testing-library/react';
import { jobQuestApi } from '@/api/job-quest';
import { mockRouter, usePathnameMock } from '@/tests/next-navigation.mock';
import {
  RouterAuthGuard,
  intervalTime,
  authenticateUrls,
} from './router-auth-guard';

const authSpy = jest.spyOn(jobQuestApi.auth, 'isAuthenticated');

describe('Router Auth Guard', () => {
  test('Unauthenticated user in /dashboard should be redirected to /auth/login ', async () => {
    authSpy.mockImplementation(() => false);
    usePathnameMock.mockImplementation(() => '/dashboard');
    mockRouter.setCurrentUrl('/dashboard');

    render(<RouterAuthGuard />);
    expect(1).toBe(1);
    expect(mockRouter.pathname).toBe('/auth/login');
  });
  // @ts-expect-error
  test.each([...authenticateUrls])(
    'authenticated user should be redirected to /dashboard when link is %s',
    (pathName) => {
      authSpy.mockImplementation(() => true);
      usePathnameMock.mockImplementation(() => pathName);

      render(<RouterAuthGuard />);
      expect(mockRouter.pathname).toBe('/dashboard');
    }
  );

  test(`should continuously check for authentication `, async () => {
    jest.useFakeTimers();
    authSpy.mockImplementation(() => false);
    usePathnameMock.mockImplementation(() => '/dashboard');

    render(<RouterAuthGuard />);
    jest.advanceTimersByTime(intervalTime * 2.1);
    // should only push once when authentication changes
    expect(mockRouter.pathname).toBe('/auth/login');
  });
});
