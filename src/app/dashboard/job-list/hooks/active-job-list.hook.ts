import { setActiveJobList as _setActiveJobList } from '@app/dashboard/dashboard.slice';
import { useAppDispatch, useAppSelector } from '@app/store';
import { useEffect } from 'react';
import { useJobLists } from './job-lists.hook';

export function useActiveJobList(): [
  number | undefined,
  (jobListId: number) => void
] {
  const jobListQuery = useJobLists();
  const dispatch = useAppDispatch();
  const activeJobList = useAppSelector(
    (state) => state.dashboard.jobListPanel.activeJobList
  );

  const setActiveJobList = (jobListId: number) => {
    dispatch(_setActiveJobList(jobListId));
  };

  useEffect(() => {
    const jobList = jobListQuery.data?.data?.[0];
    if (!activeJobList && jobList) {
      setActiveJobList(jobList.id);
    }
  }, [jobListQuery.isSuccess]);

  return [activeJobList, setActiveJobList];
}
