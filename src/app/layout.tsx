'use client';
import '@styles/bulma.sass';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { store } from '@common/store/store';

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
          <Provider store={store}>{p.children}</Provider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
