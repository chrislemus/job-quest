import { Grid, Skeleton } from '@common/ui/atoms';
import { PropsWithChildren, PropsWithoutRef, useMemo } from 'react';
import { JobCard } from './job-card';
import { useJobs } from '@app/dashboard/job/hooks';
import { useJobLists } from '@app/dashboard/job-list/hooks';

function GridItem(p: PropsWithChildren<{}>) {
  return (
    <Grid xs={12} sm={6} md={4} lg={3}>
      {p.children}
    </Grid>
  );
}

type JobListPanelProps = {
  activeJobListId: number;
};

export function JobListPanel(p: PropsWithoutRef<JobListPanelProps>) {
  const jobsQuery = useJobs({ jobListId: p.activeJobListId });
  const jobs = jobsQuery.data?.data;
  const JobsListQuery = useJobLists();
  const jobLists = JobsListQuery.data?.data || [];

  const loadingCards = useMemo(() => {
    if (jobsQuery.isLoading) {
      return Array.from({ length: 8 }, (_v, i) => (
        <GridItem key={i}>
          <Skeleton variant="rectangular" height={150} />
        </GridItem>
      ));
    }
  }, [jobsQuery.isLoading]);

  return (
    <Grid
      container
      rowSpacing={6}
      columnSpacing={3}
      justifyContent={{ xs: 'center', sm: 'flex-start' }}
      paddingTop={3}
    >
      {/* TODO: add error boundary */}
      {jobsQuery.isLoading && loadingCards}
      {jobs?.map((job) => {
        return (
          <GridItem key={job.id}>
            <JobCard job={job} jobLists={jobLists} />
          </GridItem>
        );
      })}
    </Grid>
  );
}
