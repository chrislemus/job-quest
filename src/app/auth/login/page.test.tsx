import { renderWithQueryClient } from '@/tests/query-client';
import Login from './page';
import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { server } from '@/tests/server';
import { authDataApiUrlConstant } from '../services/auth-data/auth-data-api-url.constant';
import { http, HttpResponse } from 'msw';
import { AuthLogInResBodyDto } from '../services';

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
    http.post<AuthLogInResBodyDto>(
      authDataApiUrlConstant.login,
      async (config) => {
        postData = await config.request.json();
        return HttpResponse.json(null, { status: 200 });
      }
    )
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
