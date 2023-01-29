import Dashboard from './page';
import { screen, waitFor } from '@testing-library/react';
import { renderWithQueryClient } from '@tests/query-client';
import { jobMocks } from './job/_mocks';
import { jobListMocks } from './job-list/_mocks';

jest.mock('universal-cookie', () => {
  const mCookie = {
    get: jest.fn().mockReturnValue({
      accessToken: 'string',
      refreshToken: 'string',
    }),
  };

  return jest.fn(() => mCookie);
});

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
