import { Grid, Skeleton } from '@common/ui/atoms';
import { JobEntity } from '@app/dashboard/job/_entities';
import { JobListEntity } from '@app/dashboard/job-list/_entities';
import { PropsWithChildren, PropsWithoutRef, useMemo } from 'react';
import { JobCard } from './job-card';

interface JobListPanelProps {
  jobs: JobEntity[];
  jobLists: JobListEntity[];
  loading?: number;
}

function GridItem(p: PropsWithChildren<{}>) {
  return <Grid xs={12}>{p.children}</Grid>;
}

export function JobListPanel(p: PropsWithoutRef<JobListPanelProps>) {
  const loadingCards = useMemo(
    () =>
      p.loading &&
      Array.from({ length: p.loading }, (_v, i) => (
        <GridItem key={i}>
          <Skeleton variant="rectangular" height={150} />
        </GridItem>
      )),
    [p.loading]
  );

  return (
    <Grid
      container
      rowSpacing={6}
      columnSpacing={3}
      justifyContent={{ xs: 'center', sm: 'flex-start' }}
      paddingTop={3}
    >
      {/* TODO: add error boundary */}
      {p.loading ? (
        <>{loadingCards}</>
      ) : (
        p.jobs.map((job, idx) => {
          return (
            <GridItem key={idx}>
              <JobCard
                job={job}
                key={idx + job.title + job.jobListId}
                jobLists={p.jobLists}
              />
            </GridItem>
          );
        })
      )}
    </Grid>
  );
}
