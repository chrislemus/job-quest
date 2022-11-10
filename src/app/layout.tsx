'use client';
import '@src/styles/bulma.sass';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren } from 'react';
import { UserProvider } from '@root/src/features/user/user.context';
import { AuthProvider } from '@src/features/auth';

const queryClient = new QueryClient();

export default function RootLayout(p: PropsWithChildren<{}>) {
  return (
    <html>
      <head>
        <title>Job Quest</title>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <UserProvider>{p.children}</UserProvider>
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
