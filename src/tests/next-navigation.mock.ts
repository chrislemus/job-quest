import mockRouter from 'next-router-mock';
import { mockUsePathnameFactory } from './jest.setup';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';

const mockUsePathName = jest.requireMock('next/navigation')
  .usePathname as ReturnType<typeof mockUsePathnameFactory>;

export { mockRouter, mockUsePathName, MemoryRouterProvider };
