import { renderWithQueryClient } from '@tests/query-client';
import Login from './page';
import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '@mui/material';
import { theme } from '@common/theme';
import { server, rest } from '@tests/server';
import { jobQuestApiUrls } from '@api/job-quest/job-quest-api-urls.const';

it('should display field errors', async () => {
  renderWithQueryClient(
    <ThemeProvider theme={theme}>
      <Login />
    </ThemeProvider>
  );

  await screen
    .findByRole('button', { name: /log in/i })
    .then((btn) => userEvent.click(btn));

  await screen.findByText(/email must be an email/i).then((el) => {
    expect(el).toBeTruthy();
  });

  await screen.findByText(/password must be longer/i).then((el) => {
    expect(el).toBeTruthy();
  });
});

it('should submit valid form', async () => {
  renderWithQueryClient(
    <ThemeProvider theme={theme}>
      <Login />
    </ThemeProvider>
  );

  const data = {
    email: 'john@me.com',
    password: 'hello123',
  };

  let postData;

  server.use(
    rest.post(jobQuestApiUrls.auth.login, async (req, res, ctx) => {
      postData = await req.json();
      return res(ctx.status(200));
    })
  );

  await screen
    .findByRole('textbox', { name: /email/i })
    .then((f) => userEvent.type(f, data.email));

  await screen
    .findByLabelText(/password/i)
    .then((f) => userEvent.type(f, data.password));

  await screen
    .findByRole('button', { name: /log in/i })
    .then((btn) => userEvent.click(btn));

  expect(postData).toEqual(data);
});
