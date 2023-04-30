// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import 'reflect-metadata';
import { server } from './server';
import { usePathname as _usePathname } from 'next/navigation';
import { mockUsePathName } from './next-navigation.mock';

const defaultMockPath = '/defaultMockPath';
export function mockUsePathnameFactory() {
  return jest.fn<
    ReturnType<typeof _usePathname>,
    Parameters<typeof _usePathname>
  >(() => defaultMockPath);
}

jest.mock('next/navigation', () => {
  const originalModule = require('next-router-mock');

  //Mock the default export and named export 'foo'
  return {
    __esModule: true,
    ...originalModule,
    usePathname: mockUsePathnameFactory(),
  };
});

// Establish API mocking before all tests.
beforeAll(() => {
  server.listen();
});

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => {
  server.resetHandlers();
  mockUsePathName.mockImplementation(() => defaultMockPath);
});

// Clean up after the tests are finished.
afterAll(() => server.close());
