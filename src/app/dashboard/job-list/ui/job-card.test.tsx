import { jobListMocks } from '@api/job-quest/job-list/job-list.mocks';
import { jobMocks } from '@api/job-quest/job/job.mocks';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithQueryClient } from '@tests/query-client';
import { rest, server } from '@tests/server';
import { JobCard } from './job-card';
import { mockRouter, MemoryRouterProvider } from '@tests/next-navigation.mock';
import { jobQuestApiUrls } from '@api/job-quest/job-quest-api-urls.const';
import { JobListEntity } from '@api/job-quest/job-list/job-list.entity';

const jobMock = jobMocks[0];

describe('Job Card', () => {
  it('displays company and title', async () => {
    renderWithQueryClient(<JobCard job={jobMock} jobLists={jobListMocks} />);
    await expect(screen.findByText(jobMock.title)).toBeTruthy();
    await expect(screen.findByText(jobMock.company)).toBeTruthy();
  });

  it('redirects user to job page when clicked', async () => {
    renderWithQueryClient(
      <MemoryRouterProvider>
        <JobCard job={jobMock} jobLists={jobListMocks} />
      </MemoryRouterProvider>
    );
    const titleELement = await screen.findByText(jobMock.title);
    await userEvent.click(titleELement);
    expect(mockRouter.asPath).toBe(`/dashboard/job/${jobMock.id}`);
  });

  it('updates job list', async () => {
    // select a job list that is not currently linked to current job
    const jobListSelection = jobListMocks.find(
      (jobList) => jobList.id !== jobMock.jobListId
    ) as JobListEntity;

    let postData;

    server.use(
      rest.patch(
        jobQuestApiUrls.job.update(jobMock.id),
        async (req, res, ctx) => {
          postData = await req.json();
          return res(ctx.status(200));
        }
      )
    );

    renderWithQueryClient(<JobCard job={jobMock} jobLists={jobListMocks} />);

    const jobListButton = await screen.findByTestId<HTMLButtonElement>(
      'job-list-menu'
    );

    await userEvent.click(jobListButton);

    await screen
      .findAllByTestId('job-list-menu-item')
      .then(async (menuItems) => {
        const menuItem = menuItems.find((item) => {
          return item.textContent === jobListSelection.label;
        });
        if (menuItem) {
          await userEvent.click(menuItem);
        }
      });

    expect(postData).toEqual({ jobListId: jobListSelection.id });
  });
});
