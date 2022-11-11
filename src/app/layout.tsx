'use client';
// import '@styles/bulma.sass';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { store } from '@common/store/store';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';

const queryClient = new QueryClient();
const theme = createTheme();

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
              <Provider store={store}>{p.children}</Provider>
            </QueryClientProvider>
          </CssBaseline>
        </ThemeProvider>
      </body>
    </html>
  );
}
