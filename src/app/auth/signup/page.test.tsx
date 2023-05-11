import { renderWithQueryClient } from '@/tests/query-client';
import SignUp from './page';
import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { server, rest } from '@/tests/server';
import { jobQuestApiUrls } from '@/api/job-quest/job-quest-api-urls.const';

it('should display field errors', async () => {
  renderWithQueryClient(<SignUp />);

  await screen
    .findByRole('button', { name: /sign up/i })
    .then((btn) => userEvent.click(btn));

  await screen.findAllByText(/should not be empty/i).then((elements) => {
    expect(elements).toHaveLength(2);
  });

  await screen.findByText(/email must be an email/i).then((fieldError) => {
    expect(fieldError).toBeTruthy();
  });

  await screen.findByText(/password must be longer/i).then((fieldError) => {
    expect(fieldError).toBeTruthy();
  });
});
it('should submit valid form', async () => {
  renderWithQueryClient(<SignUp />);

  const data = {
    firstName: 'john',
    lastName: 'doe',
    email: 'john@me.com',
    password: 'hello123',
  };

  let postData;

  server.use(
    rest.post(jobQuestApiUrls.auth.signup, async (req, res, ctx) => {
      postData = await req.json();
      return res(ctx.status(200));
    })
  );

  await screen
    .findByTestId('form-first-name')
    .then((f) => userEvent.type(f, data.firstName));

  await screen
    .findByTestId('form-last-name')
    .then((f) => userEvent.type(f, data.lastName));

  await screen
    .findByTestId('form-email')
    .then((f) => userEvent.type(f, data.email));

  await screen
    .findByTestId('form-password')
    .then((f) => userEvent.type(f, data.password));

  await screen
    .findByRole('button', { name: /sign up/i })
    .then((btn) => userEvent.click(btn));

  expect(postData).toEqual(data);
});
