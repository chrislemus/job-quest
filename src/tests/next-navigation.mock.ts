import * as NextRouter from 'next/navigation';

type R = ReturnType<typeof NextRouter.useRouter>;

export const useRouterMock = {
  push: jest.fn<ReturnType<R['push']>, Parameters<R['push']>>(),
  back: jest.fn<ReturnType<R['back']>, Parameters<R['back']>>(),
  forward: jest.fn<ReturnType<R['forward']>, Parameters<R['forward']>>(),
  refresh: jest.fn<ReturnType<R['refresh']>, Parameters<R['refresh']>>(),
  replace: jest.fn<ReturnType<R['replace']>, Parameters<R['replace']>>(),
  prefetch: jest.fn<ReturnType<R['prefetch']>, Parameters<R['prefetch']>>(),
};

export const usePathNameMock = jest.spyOn(NextRouter, 'usePathname');

jest.spyOn(NextRouter, 'useRouter').mockReturnValue(useRouterMock);

beforeEach(() => {
  for (const mock of Object.values(useRouterMock)) {
    mock.mockClear();
  }
  usePathNameMock.mockClear();
});
