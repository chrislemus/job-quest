import { render, screen, waitFor } from '@testing-library/react';
import { QueryClientTestProvider } from '@tests/query-client';
import { PropsWithChildren } from 'react';
import { DashboardStoreProvider } from '@app/dashboard/store';
import { JobListTopMenu } from './job-list-top-menu';
import userEvent from '@testing-library/user-event';

function AllProviders(p: PropsWithChildren<{}>) {
  return (
    <DashboardStoreProvider>
      <QueryClientTestProvider>{p.children}</QueryClientTestProvider>
    </DashboardStoreProvider>
  );
}

describe('Job List Top Menu', () => {
  test('should toggle "new job" modal', async () => {
    render(<JobListTopMenu />, { wrapper: AllProviders });
    await screen
      .findByRole('button', { name: /add/i })
      .then((btn) => userEvent.click(btn));

    const modal = await screen.findByText(/add a job/i);
    expect(modal).toBeTruthy();

    await screen
      .findByRole('button', { name: /cancel/i })
      .then((btn) => userEvent.click(btn));

    await waitFor(() => {
      expect(screen.queryByText(/add a job/i)).toBeFalsy();
    });
  });
});
