import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useMemo } from 'react';
import { useJobLists } from './job-lists.hook';

const QS_KEY = 'list';

export function useActiveJobList(): [
  number | null,
  (jobListId: number) => void
] {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const activeJobList = useMemo(() => {
    const params = new URLSearchParams(searchParams);
    const activeJobList = params.get(QS_KEY);
    const isNumberStr = activeJobList && /^\d+$/.test(activeJobList);
    return isNumberStr ? +activeJobList : null;
  }, [searchParams]);

  /** Create a Link with updated query string value */
  const qs = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(QS_KEY, value);
      return params.toString();
    },
    [searchParams]
  );

  const setActiveJobList = (jobListId: number) => {
    router.replace(pathname + '?' + qs(`${jobListId}`));
  };

  const jobListQuery = useJobLists();
  const jobLists = jobListQuery.data?.data;

  useEffect(() => {
    const firstList = jobLists?.[0];
    if (activeJobList === null && firstList) {
      setActiveJobList(firstList.id);
    }
  }, [jobLists]);

  return [activeJobList, setActiveJobList];
}
