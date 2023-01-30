import { Grid, Skeleton } from '@common/ui/atoms';
import { PropsWithChildren, PropsWithoutRef } from 'react';
import { JobCard } from './job-card';
import { useJobs } from '@app/dashboard/job/hooks';
import { JobListEntity } from '@api/job-quest/job-list/job-list.entity';

function GridItem(p: PropsWithChildren<{}>) {
  return (
    <Grid xs={12} sm={6} md={4} lg={3}>
      {p.children}
    </Grid>
  );
}

function LoadingCards() {
  return (
    <>
      {Array.from({ length: 8 }, (_v, i) => (
        <GridItem key={i}>
          <Skeleton variant="rectangular" height={150} />
        </GridItem>
      ))}
    </>
  );
}

type JobListPanelProps = {
  jobLists: JobListEntity[];
  activeJobListId: number;
};

export function JobListPanel(p: PropsWithoutRef<JobListPanelProps>) {
  const jobsQuery = useJobs({ jobListId: p.activeJobListId });

  return (
    <Grid
      container
      rowSpacing={6}
      columnSpacing={3}
      justifyContent={{ xs: 'center', sm: 'flex-start' }}
      paddingTop={3}
    >
      {/* TODO: add error boundary */}
      {jobsQuery.isLoading && <LoadingCards />}
      {jobsQuery.data?.data.map((job) => {
        return (
          <GridItem key={job.id}>
            <JobCard job={job} jobLists={p.jobLists} />
          </GridItem>
        );
      })}
    </Grid>
  );
}