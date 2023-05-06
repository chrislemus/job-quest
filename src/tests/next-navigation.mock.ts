import mockRouter from 'next-router-mock';
import { usePathnameMockFactory } from './jest.setup';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';

const usePathnameMock = jest.requireMock('next/navigation')
  .usePathname as ReturnType<typeof usePathnameMockFactory>;
const useSearchParamsMock = jest.requireMock('next/navigation')
  .usePathname as ReturnType<typeof usePathnameMockFactory>;

export {
  mockRouter,
  usePathnameMock,
  useSearchParamsMock,
  MemoryRouterProvider,
};
