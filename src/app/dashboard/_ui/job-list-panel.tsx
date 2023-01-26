import { Grid, Skeleton } from '@common/ui/atoms';
import { JobListEntity } from '@app/dashboard/job-list/_entities';
import { PropsWithChildren, PropsWithoutRef } from 'react';
import { JobCard } from './job-card';
import { useJobsQuery } from '@app/dashboard/job/_query-hooks';

function LoadingCards() {
  return (
    <>
      {Array.from({ length: 5 }, (_v, i) => (
        <div key={i}>
          <Skeleton variant="rectangular" height={150} />
        </div>
      ))}
    </>
  );
}

type JobListPanelProps = {
  jobLists: JobListEntity[];
  activeJobListId: number;
};

export function JobListPanel(p: PropsWithoutRef<JobListPanelProps>) {
  const jobsQuery = useJobsQuery({ jobListId: p.activeJobListId });

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}
    >
      {/* TODO: add error boundary */}
      {jobsQuery.isLoading && <LoadingCards />}
      {jobsQuery.data?.data.map((job) => {
        return (
          <div key={job.id}>
            <JobCard job={job} jobLists={p.jobLists} />
          </div>
        );
      })}
    </div>
  );
}
