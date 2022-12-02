'use client';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { jobService } from '@app/dashboard/job/_services';
import { JobListMainNav, JobListPanel, JobListSubNav } from './_ui';
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

  const jobsQueryFilters = { jobListId: activeJobListId || undefined };
  const jobsQuery = useQuery({
    enabled: !!jobsQueryFilters.jobListId,
    queryKey: ['jobs', jobsQueryFilters],
    queryFn: () => {
      return jobService.getAll(jobsQueryFilters);
    },
  });

  return (
    <>
      <JobListMainNav
        jobList={JobsListQuery.data?.data || []}
        setActiveJobList={(a: number) => setActiveJobListId(a)}
        activeJobListId={activeJobListId}
        loading={JobsListQuery.isLoading}
      />

      <JobListSubNav />

      <JobListPanel
        loading={JobsListQuery.isLoading || jobsQuery.isLoading ? 3 : undefined}
        jobs={jobsQuery.data?.data || []}
        jobLists={JobsListQuery.data?.data || []}
      />
    </>
  );
}
