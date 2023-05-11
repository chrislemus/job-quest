import { jobMocks } from '@/api/job-quest/job/job.mocks';
import { render, screen } from '@testing-library/react';
import { QueryClientTestProvider } from '@/tests/query-client';
import { PropsWithChildren } from 'react';
import { JobListColumn } from './job-list-column';
import { DashboardStoreProvider } from '@/app/dashboard/store';
import { jobListMocks } from '@/api/job-quest/job-list/job-list.mocks';

function AllProviders(p: PropsWithChildren<{}>) {
  return (
    <DashboardStoreProvider>
      <QueryClientTestProvider>{p.children}</QueryClientTestProvider>
    </DashboardStoreProvider>
  );
}

const toggleModal = jest.fn();

// TODO: resolve jest error when importing ReactDnD package
describe('Job List Column', () => {
  it.skip('Displays job card', async () => {
    // render(
    //   <JobListColumn jobList={jobListMocks[0]} toggleModal={toggleModal} />,
    //   {
    //     wrapper: AllProviders,
    //   }
    // );
    // const tabContent = await screen.findByText(jobMocks[3].company);
    // await expect(tabContent.textContent).toBe(jobMocks[3].company);
  });
});
