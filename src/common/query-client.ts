import { DefaultOptions, QueryClient } from '@tanstack/react-query';

export const defaultQueryClientOptions: DefaultOptions<unknown> = {
  queries: {
    staleTime: 600000, // 10 minutes
    cacheTime: 900000, // default cacheTime is 5 minutes; doesn't make sense for staleTime to exceed cacheTime
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  },
};

export const queryClient = new QueryClient({
  defaultOptions: defaultQueryClientOptions,
});
