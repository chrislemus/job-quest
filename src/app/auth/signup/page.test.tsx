import { renderWithQueryClient } from '@/tests/query-client';
import SignUp from './page';
import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { server } from '@/tests/server';
import { authDataApiUrlConstant } from '../services/auth-data/auth-data-api-url.constant';
import { http, HttpResponse } from 'msw';
import { AuthSignupReqBodyDto } from '../services';

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
    http.post<never, AuthSignupReqBodyDto>(
      authDataApiUrlConstant.signup,
      async (info) => {
        postData = await info.request.json();
        return HttpResponse.json(null, { status: 200 });
      }
    )
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
