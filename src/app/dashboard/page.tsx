'use client';
import { jobListService, jobService } from '@core/job/services';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { JobListMainNav, JobListPanel, JobListSubNav } from './ui';

export default function Dashboard() {
  const [activeJobListId, setActiveJobListId] = useState<number>();

  const JobsListQuery = useQuery({
    queryKey: ['jobList'],
    queryFn: () => {
      return jobListService.getAll();
    },
    onSuccess: (d) => {
      const defaultId = d?.data?.[0]?.id;
      if (!activeJobListId && defaultId) setActiveJobListId(defaultId);
    },
  });

  const jobsQueryFilters = { jobListId: activeJobListId || undefined };
  const jobsQuery = useQuery({
    enabled: !!JobsListQuery?.data,
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
