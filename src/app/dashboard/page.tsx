'use client';
import { useEffect, useState } from 'react';
import { JobListMainNav, JobListPanel, DashboardActionButtons } from './ui';
import { useJobLists } from '@app/dashboard/job-list/hooks';

export default function Dashboard() {
  const [activeJobListId, setActiveJobListId] = useState<number>();
  const JobsListQuery = useJobLists();
  const jobLists = JobsListQuery.data?.data;

  useEffect(() => {
    const firstJobList = jobLists?.[0];
    if (!activeJobListId && firstJobList) {
      setActiveJobListId(firstJobList.id);
    }
  }, [JobsListQuery.isSuccess]);

  // TODO: implement logic to only fetch if jobList is present
  // or leave optional, provided that all jobs will eventually be displayed.

  return (
    <>
      <DashboardActionButtons />
      <JobListMainNav
        setActiveJobList={(a: number) => setActiveJobListId(a)}
        activeJobListId={activeJobListId}
      />

      {activeJobListId && <JobListPanel activeJobListId={activeJobListId} />}
    </>
  );
}
