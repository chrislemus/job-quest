import { QueryClientTestProvider } from '@/tests/query-client';
import { PropsWithChildren } from 'react';
import { DashboardStoreProvider } from '@/app/dashboard/store';

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
