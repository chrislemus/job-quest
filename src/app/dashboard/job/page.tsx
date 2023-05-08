'use client';
import { useJobLists } from '../job-list/hooks';
import { JobListColumn } from './ui';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useRef } from 'react';
export default function JobListPage() {
  const JobsListQuery = useJobLists();
  const jobLists = JobsListQuery.data?.data || [];

  const jobListCols = jobLists.map((list) => {
    return <JobListColumn jobList={list} key={list.id} />;
  });

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="h-full flex gap-2 overflow-x-auto">{jobListCols}</div>
    </DndProvider>
  );
}
