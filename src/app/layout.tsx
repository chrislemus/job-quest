'use client';
import * as React from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from '@common/theme';
import { queryClient } from '@common/query-client';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export default function RootLayout(p: PropsWithChildren<{}>) {
  return (
    <html>
      <head>
        <title>Job Quest</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </head>
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline>
            <QueryClientProvider client={queryClient}>
              {/* <ReactQueryDevtools initialIsOpen={false} /> */}
              {p.children}
            </QueryClientProvider>
          </CssBaseline>
        </ThemeProvider>
      </body>
    </html>
  );
}
