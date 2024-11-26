'use client';
import '@/styles/global.css';
import * as React from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/shared/query-client';
import { RouterAuthGuard } from './auth/ui';

export default function RootLayout(p: React.PropsWithChildren<{}>) {
  return (
    <html data-theme="emerald">
      <head>
        <title>Job Quest</title>
        <link rel="icon" href="/favicon.ico" />

        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </head>
      <body>
        <RouterAuthGuard>
          <QueryClientProvider client={queryClient}>
            {p.children}
          </QueryClientProvider>
        </RouterAuthGuard>
      </body>
    </html>
  );
}
