import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import { useJobLists } from './job-lists.hook';

const QS_KEY = 'list';

export function useActiveJobList(): [
  number | null,
  (jobListId: number) => void
] {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  // const [activeJobList, setActive] = useState<number>();
  const getLatestListFromParams = (): number | null => {
    const params = new URLSearchParams(searchParams);
    const activeJobList = params.get(QS_KEY);
    if (activeJobList && /^\d+$/.test(activeJobList)) {
      return +activeJobList;
    }
    return null;
  };
  const activeJobList = getLatestListFromParams();

  /** Create a Link with updated query string value */
  const qs = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(QS_KEY, value);

      return params.toString();
    },
    [searchParams]
  );

  const jobListQuery = useJobLists();

  const setActiveJobList = (jobListId: number) => {
    router.replace(pathname + '?' + qs(`${jobListId}`));
  };

  useEffect(() => {
    if (activeJobList === null) {
      let activeList = getLatestListFromParams();
      if (activeList !== null) setActiveJobList(+activeList);
    }
  }, [searchParams]);

  useEffect(() => {
    const jobList = jobListQuery.data?.data?.[0];
    if (activeJobList === null && jobList) {
      setActiveJobList(jobList.id);
    }
  }, [jobListQuery.isSuccess]);

  return [activeJobList, setActiveJobList];
}
