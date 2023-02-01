import Dashboard from './page';
import { screen } from '@testing-library/react';
import { renderWithQueryClient } from '@tests/query-client';
import { jobListMocks } from '@api/job-quest/job-list/job-list.mocks';
import { jobMocks } from '@api/job-quest/job/job.mocks';

test('contains add job button', async () => {
  renderWithQueryClient(<Dashboard />);
  const addJobBtn = await screen.findByText('Add');
  expect(addJobBtn).toBeTruthy();
});

test('contains job list menu', async () => {
  await renderWithQueryClient(<Dashboard />);
  const jobListName = await screen.findByText(jobListMocks[0].label);
  expect(jobListName).toBeTruthy();
});

test('contains job cards', async () => {
  await renderWithQueryClient(<Dashboard />);
  const job = await screen.findByText(jobMocks[0].title);
  expect(job).toBeTruthy();
});
