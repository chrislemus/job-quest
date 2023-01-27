'use client';
import { useEffect, useState } from 'react';
import { JobListMainNav, JobListPanel, DashboardActionButtons } from './_ui';
import { useJobListQuery } from './job-list/_query-hooks';

export default function Dashboard() {
  const [activeJobListId, setActiveJobListId] = useState<number>();
  const JobsListQuery = useJobListQuery();

  useEffect(() => {
    const data = JobsListQuery.data?.data;
    if (!activeJobListId && data) {
      const orderedJobList = data.sort((a, b) => a.order - b.order);
      const firstJobList = orderedJobList?.[0]?.id;
      // list should not be empty, but adding if condition to avoid errors
      if (firstJobList) setActiveJobListId(firstJobList);
    }
  }, [JobsListQuery.isSuccess]);

  // TODO: implement logic to only fetch if jobList is present
  // or leave optional, provided that all jobs will eventually be displayed.

  return (
    <>
      <DashboardActionButtons />
      <JobListMainNav
        jobList={JobsListQuery.data?.data || []}
        setActiveJobList={(a: number) => setActiveJobListId(a)}
        activeJobListId={activeJobListId}
        loading={JobsListQuery.isLoading}
      />

      {activeJobListId && (
        <JobListPanel
          activeJobListId={activeJobListId}
          jobLists={JobsListQuery.data?.data || []}
        />
      )}
    </>
  );
}
