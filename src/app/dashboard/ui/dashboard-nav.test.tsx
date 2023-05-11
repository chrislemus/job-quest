import { screen } from '@testing-library/react';
import { renderWithQueryClient } from '@/tests/query-client';
import { DashboardNav } from './dashboard-nav';
import { mockRouter } from '@/tests/next-navigation.mock';
import { userProfileMock } from '@/api/job-quest/user/user.mocks';
import userEvent from '@testing-library/user-event';

const { firstName, lastName } = userProfileMock;
const mockInitials = firstName[0] + lastName[0];
const findAvatarMenu = () => {
  return screen.findByText(mockInitials);
};

describe('Dashboard Nav', () => {
  describe('Logo', () => {
    test('contains anchor logo text', async () => {
      renderWithQueryClient(<DashboardNav />);
      await screen
        .findByRole('link', { name: /jobQuest/i })
        .then((logoLink) => {
          expect(logoLink.textContent).toBe('JobQuest');
        });
    });
  });
  describe('User Avatar Menu', () => {
    test('Avatar menu contains user initials ', async () => {
      renderWithQueryClient(<DashboardNav />);
      await findAvatarMenu().then((avatarMenu) => {
        expect(avatarMenu.textContent).toBe(mockInitials);
      });
    });
    test('redirects user to login page after "logout"', async () => {
      renderWithQueryClient(<DashboardNav />);
      const avatarMenu = await findAvatarMenu();
      await userEvent.click(avatarMenu);
      const logoutBtn = await screen.findByText('Logout');
      await userEvent.click(logoutBtn);
      expect(mockRouter.pathname).toBe('/auth/login');
    });
  });
});
