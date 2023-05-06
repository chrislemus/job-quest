import { renderWithQueryClient } from '@tests/query-client';
import Login from './page';
import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { server, rest } from '@tests/server';
import { jobQuestApiUrls } from '@api/job-quest/job-quest-api-urls.const';

it('should display field errors', async () => {
  renderWithQueryClient(<Login />);

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
  renderWithQueryClient(<Login />);

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
    .findByTestId('form-email')
    .then((f) => userEvent.type(f, data.email));

  await screen
    .findByTestId('form-password')
    .then((f) => userEvent.type(f, data.password));

  await screen
    .findByRole('button', { name: /log in/i })
    .then((btn) => userEvent.click(btn));

  expect(postData).toEqual(data);
});
