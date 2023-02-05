import { jobListMocks } from '@api/job-quest/job-list/job-list.mocks';
import { jobMocks } from '@api/job-quest/job/job.mocks';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithQueryClient } from '@tests/query-client';
import { rest, server } from '@tests/server';
import { JobCard } from './job-card';
import { useRouterMock } from '@tests/next-navigation.mock';
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
    let pushUrl = '';
    useRouterMock.push.mockImplementation((url) => {
      pushUrl = url;
    });

    renderWithQueryClient(<JobCard job={jobMock} jobLists={jobListMocks} />);
    const titleELement = await screen.findByText(jobMock.title);
    await userEvent.click(titleELement);
    expect(pushUrl).toBe(`/dashboard/job/${jobMock.id}`);
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

    const jobListButton = await screen
      .findAllByRole<HTMLButtonElement>('button')
      .then((buttons) => {
        const button = buttons.find((btn) => btn.name === 'job list');
        if (!button) throw new Error('cannot find Job List button');
        return button;
      });

    await userEvent.click(jobListButton);

    await screen
      .findByRole('menuitem', { name: jobListSelection.label })
      .then((el) => userEvent.click(el));

    expect(postData).toEqual({ jobListId: jobListSelection.id });
  });
});
