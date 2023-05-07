'use client';
import { useJobLists } from '../job-list/hooks';
import { JobListColumn } from './ui';

export default function JobListPage() {
  const JobsListQuery = useJobLists();
  const jobLists = JobsListQuery.data?.data || [];

  const jobListCols = jobLists.map((list) => {
    return <JobListColumn jobList={list} key={list.id} />;
  });

  return <div className="h-full flex gap-2 overflow-x-auto">{jobListCols}</div>;
}
