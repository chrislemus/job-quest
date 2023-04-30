import { jobMocks } from '@api/job-quest/job/job.mocks';
import { render, screen } from '@testing-library/react';
import { QueryClientTestProvider } from '@tests/query-client';
import { PropsWithChildren } from 'react';
import { JobListTabContent } from './job-list-tab-content';
import { DashboardStoreProvider } from '@app/dashboard/store';

function AllProviders(p: PropsWithChildren<{}>) {
  return (
    <DashboardStoreProvider>
      <QueryClientTestProvider>{p.children}</QueryClientTestProvider>
    </DashboardStoreProvider>
  );
}

describe('Job List Tab Content', () => {
  it('Displays job card', async () => {
    render(<JobListTabContent />, { wrapper: AllProviders });
    const tabContent = await screen.findByText(jobMocks[3].company);
    await expect(tabContent.textContent).toBe(jobMocks[3].company);
  });
});
