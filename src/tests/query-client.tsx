import { render } from '@testing-library/react';
import { defaultQueryClientOptions } from '@common/query-client';
import { PropsWithChildren, ReactElement } from 'react';
import {
  DefaultOptions,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

const defaultOptions: DefaultOptions = defaultQueryClientOptions;
if (defaultOptions.queries) defaultOptions.queries.retry = false;

// make this a function for unique queryClient per test
const generateQueryClient = () =>
  new QueryClient({
    defaultOptions,
    logger: {
      log: console.log,
      warn: console.warn,
      // ✅ no more errors on the console
      error: () => {},
    },
  });

export function QueryClientTestProvider(
  p: PropsWithChildren<{ client?: QueryClient }>
) {
  const queryClient = p?.client || generateQueryClient();
  return (
    <QueryClientProvider client={queryClient}>{p.children}</QueryClientProvider>
  );
}

export function renderWithQueryClient(ui: ReactElement, client?: QueryClient) {
  const queryClient = client ?? generateQueryClient();

  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
}

// from https://tkdodo.eu/blog/testing-react-query#for-custom-hooks
export const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: defaultQueryClientOptions,
  });

  return (p: PropsWithChildren<{}>) => (
    <QueryClientProvider client={queryClient}>{p.children}</QueryClientProvider>
  );
};
