import Dashboard from './page';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

jest.mock('universal-cookie', () => {
  const mCookie = {
    get: jest.fn().mockReturnValue({
      accessToken: 'string',
      refreshToken: 'string',
    }),
  };

  return jest.fn(() => mCookie);
});

test('contains add job button', () => {
  render(
    <QueryClientProvider client={queryClient}>
      <Dashboard />
    </QueryClientProvider>
  );
  const addJobBtn = screen.getByText('Add');
  expect(addJobBtn).toBeTruthy();
});

test('contains loading job cards', async () => {
  const { container } = render(
    <QueryClientProvider client={queryClient}>
      <Dashboard />
    </QueryClientProvider>
  );

  const loadingJobCards = container.querySelectorAll('.MuiSkeleton-root');
  expect(loadingJobCards?.length).toBeGreaterThan(2);
});
