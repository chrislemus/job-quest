import { render } from '@testing-library/react';
import { jobQuestApi } from '@api/job-quest';
import { useRouterMock, usePathNameMock } from '@tests/next-navigation.mock';
import {
  RouterAuthGuard,
  intervalTime,
  authenticateUrls,
} from './router-auth-guard';

const authSpy = jest.spyOn(jobQuestApi.auth, 'isAuthenticated');

describe('Router Auth Guard', () => {
  test('Unauthenticated user in /dashboard should be redirected to /auth/login ', async () => {
    authSpy.mockImplementation(() => false);
    let pushUrl = '';
    useRouterMock.push.mockImplementation((url) => {
      pushUrl = url;
    });
    usePathNameMock.mockImplementation(() => '/dashboard');

    render(<RouterAuthGuard />);
    expect(pushUrl).toBe('/auth/login');
  });
  // @ts-expect-error
  test.each([...authenticateUrls])(
    'authenticated user should be redirected to /dashboard when link is %s',
    (pathName) => {
      authSpy.mockImplementation(() => true);
      let pushUrl = '';
      useRouterMock.push.mockImplementation((url) => {
        pushUrl = url;
      });

      usePathNameMock.mockImplementation(() => pathName);

      render(<RouterAuthGuard />);
      expect(pushUrl).toBe('/dashboard');
      expect(useRouterMock.push).toBeCalledTimes(1);
    }
  );

  test(`should continuously check for authentication `, async () => {
    jest.useFakeTimers();
    authSpy.mockImplementation(() => false);
    useRouterMock.push.mockImplementation(() => {});
    usePathNameMock.mockImplementation(() => '/dashboard');

    render(<RouterAuthGuard />);
    jest.advanceTimersByTime(intervalTime * 2.1);
    expect(useRouterMock.push).toBeCalledTimes(3);
  });
});
