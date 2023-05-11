'use client';
import { useMemo, useState } from 'react';
import { useJobLists } from '../job-list/hooks';
import { AddJobModal, JobListColumn } from './ui';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export default function JobListPage() {
  const JobsListQuery = useJobLists();
  const [modal, setModal] = useState<{
    active: boolean;
    defaultJobListId?: number;
  }>({ active: false, defaultJobListId: undefined });

  const toggleModal = (defaultJobListId?: number) => {
    setModal((prev) => {
      const active = !prev.active;
      return { active, defaultJobListId };
    });
  };

  const jobLists = JobsListQuery.data?.data || [];

  const jobListCols = useMemo(
    () =>
      jobLists.map((list) => {
        return (
          <JobListColumn
            jobList={list}
            key={list.id}
            toggleModal={toggleModal}
          />
        );
      }),
    [jobLists]
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="h-full flex gap-2 overflow-x-auto">{jobListCols}</div>
      {modal.active && (
        <AddJobModal
          active={modal.active}
          toggle={toggleModal}
          defaultJobListId={modal.defaultJobListId}
        />
      )}
    </DndProvider>
  );
}
