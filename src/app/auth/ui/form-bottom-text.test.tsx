import { render, screen } from '@testing-library/react';
import { usePathNameMock } from '@tests/next-navigation.mock';
import { FormBottomText } from './form-bottom-text';

describe('Auth form bottom text', () => {
  test.each(['/auth/login', '/auth/signup', '/auth'])(
    '%s bottom form text should display correctly',
    (pathName) => {
      usePathNameMock.mockImplementation(() => pathName);
      render(<FormBottomText />);
      switch (pathName) {
        case '/auth/login':
          const text = screen.getByText('Sign up');
          expect(text).toBeTruthy();
          break;
        case '/auth/signup':
          const text2 = screen.getByText('Log in');
          expect(text2).toBeTruthy();
          break;

        default:
          const externalLink = screen.queryByRole('link');
          expect(externalLink).toBeFalsy();
          break;
      }
    }
  );
});
