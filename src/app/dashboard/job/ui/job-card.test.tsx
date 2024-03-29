import { jobListMocks } from '@/api/job-quest/job-list/job-list.mocks';
import { jobMocks } from '@/api/job-quest/job/job.mocks';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithQueryClient } from '@/tests/query-client';
import { rest, server } from '@/tests/server';
import { JobCard } from './job-card';
import { mockRouter, MemoryRouterProvider } from '@/tests/next-navigation.mock';
import { jobQuestApiUrls } from '@/api/job-quest/job-quest-api-urls.const';
import { DashboardStoreProvider } from '@/app/dashboard/store';

const jobMock = jobMocks[0];

// TODO: resolve jest error when importing ReactDnD package
describe('Job Card', () => {
  it.skip('displays company and title', async () => {
    // renderWithQueryClient(
    //   <DashboardStoreProvider>
    //     <JobCard job={jobMock} />
    //   </DashboardStoreProvider>
    // );
    // await expect(screen.findByText(jobMock.title)).toBeTruthy();
    // await expect(screen.findByText(jobMock.company)).toBeTruthy();
  });
  // it('redirects user to job page when clicked', async () => {
  //   renderWithQueryClient(
  //     <MemoryRouterProvider>
  //       <DashboardStoreProvider>
  //         <JobCard job={jobMock} jobLists={jobListMocks} />
  //       </DashboardStoreProvider>
  //     </MemoryRouterProvider>
  //   );
  //   const titleELement = await screen.findByText(jobMock.title);
  //   await userEvent.click(titleELement);
  //   expect(mockRouter.asPath).toBe(`/dashboard/job/${jobMock.id}`);
  // });
  // it('updates job list', async () => {
  //   const job = jobMock;
  //   let postData: { jobListId?: number } = {};
  //   server.use(
  //     rest.patch(jobQuestApiUrls.job.update(job.id), async (req, res, ctx) => {
  //       postData = await req.json();
  //       job.jobListId = postData.jobListId as any;
  //       return res(ctx.status(201));
  //     })
  //   );
  //   renderWithQueryClient(
  //     <DashboardStoreProvider>
  //       <JobCard job={job} jobLists={jobListMocks} />;
  //     </DashboardStoreProvider>
  //   );
  //   const menuItem = await screen
  //     .findAllByTestId('job-list-menu-item')
  //     .then((menuItems) => {
  //       return menuItems.find((item) => {
  //         const selected = item.getAttribute('aria-selected');
  //         return selected === 'false';
  //       }) as HTMLElement;
  //     });
  //   expect(menuItem).toHaveAttribute('aria-selected', 'false');
  //   await userEvent.click(menuItem);
  //   expect(menuItem).toHaveAttribute('aria-selected', 'true');
  // });
});
