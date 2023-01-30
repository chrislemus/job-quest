'use client';
import { useEffect, useState } from 'react';
import { JobListMainNav, JobListPanel, DashboardActionButtons } from './ui';
import { useJobLists } from '@app/dashboard/job-list/hooks';

export default function Dashboard() {
  const [activeJobListId, setActiveJobListId] = useState<number>();
  const JobsListQuery = useJobLists();
  const jobListsData = JobsListQuery.data?.data;

  useEffect(() => {
    if (!activeJobListId && jobListsData) {
      const orderedJobList = jobListsData.sort((a, b) => a.order - b.order);
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
        jobList={jobListsData || []}
        setActiveJobList={(a: number) => setActiveJobListId(a)}
        activeJobListId={activeJobListId}
        loading={JobsListQuery.isLoading}
      />

      {activeJobListId && (
        <JobListPanel
          activeJobListId={activeJobListId}
          jobLists={jobListsData || []}
        />
      )}
    </>
  );
}
