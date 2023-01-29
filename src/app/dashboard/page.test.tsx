import Dashboard from './page';
import { screen, waitFor } from '@testing-library/react';
import { renderWithQueryClient } from '@tests/query-client';
import { jobListMocks } from '@api/job-quest/job-list/job-list.mocks';
import { jobMocks } from '@api/job-quest/job/job.mocks';

test('contains add job button', () => {
  renderWithQueryClient(<Dashboard />);
  const addJobBtn = screen.getByText('Add');
  expect(addJobBtn).toBeTruthy();
});

test('contains job list menu', async () => {
  await renderWithQueryClient(<Dashboard />);
  await waitFor(() => {
    const jobListName = screen.getByText(jobListMocks[0].label);
    expect(jobListName).toBeTruthy();
  });
});

test('contains job cards', async () => {
  await renderWithQueryClient(<Dashboard />);
  await waitFor(() => {
    const job = screen.getByText(jobMocks[0].title);
    expect(job).toBeTruthy();
  });
});
