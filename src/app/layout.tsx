'use client';
import * as React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { store } from '@common/store/store';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export const queryClient = new QueryClient();
export const theme = createTheme();

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
              <Provider store={store}>{p.children}</Provider>
            </QueryClientProvider>
          </CssBaseline>
        </ThemeProvider>
      </body>
    </html>
  );
}
