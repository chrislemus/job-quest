import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import { useJobLists } from './job-lists.hook';

const QS_KEY = 'list';

export function useActiveJobList(): [
  number | null,
  (jobListId: number) => void
] {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const jobListQuery = useJobLists();

  const jobLists = jobListQuery.data?.data;

  /** Create a Link with updated query string value */
  const setActiveJobList = useCallback(
    (jobListId: number) => {
      const params = new URLSearchParams(searchParams);
      params.set(QS_KEY, `${jobListId}`);
      const queryString = params.toString();
      router.replace(`${pathname}?${queryString}`);
    },
    [searchParams]
  );

  const activeJobList = useMemo(() => {
    const params = new URLSearchParams(searchParams);
    let activeJobList = params.get(QS_KEY);

    if (activeJobList === null) {
      const firstList = jobLists?.[0];
      if (firstList) activeJobList = `${firstList.id}`;
    }
    if (activeJobList && /^\d+$/.test(activeJobList)) {
      return +activeJobList;
    }
    return null;
  }, [searchParams, jobLists]);

  return [activeJobList, setActiveJobList];
}
