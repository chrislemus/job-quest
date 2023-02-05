import { render, screen } from '@testing-library/react';
import { QueryClientTestProvider } from '@tests/query-client';
import { PropsWithChildren } from 'react';
import { DashboardStoreProvider } from '@app/dashboard/store';
import { JobListTabs } from './job-list-tabs';
import { jobListMocks } from '@api/job-quest/job-list/job-list.mocks';

function AllProviders(p: PropsWithChildren<{}>) {
  return (
    <DashboardStoreProvider>
      <QueryClientTestProvider>{p.children}</QueryClientTestProvider>
    </DashboardStoreProvider>
  );
}

describe('Job List Tabs', () => {
  test.each(jobListMocks.map((j) => j.label))(
    '"%s" tab label is displayed',
    async (tabLabel) => {
      render(<JobListTabs />, { wrapper: AllProviders });
      const tab = await screen.findByText(tabLabel);
      await expect(tab.textContent).toBe(tabLabel);
    }
  );
});
