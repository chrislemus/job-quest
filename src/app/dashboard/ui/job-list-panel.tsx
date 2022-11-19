import { Grid, Skeleton } from '@common/ui/atoms';
import { JobEntity } from '@core/job/entities';
import { PropsWithChildren, PropsWithoutRef, useMemo } from 'react';
import { JobCard } from './job-card';

interface JobListPanelProps {
  jobs: JobEntity[];
  loading?: number;
}

export function JobListPanel(p: PropsWithoutRef<JobListPanelProps>) {
  function GridItem(p: PropsWithChildren<{}>) {
    return (
      <Grid xs={12} sm={6} md={4} lg={3}>
        {p.children}
      </Grid>
    );
  }

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
      {p.loading ? (
        <>{loadingCards}</>
      ) : (
        p.jobs.map((job, idx) => {
          return (
            <GridItem key={idx}>
              <JobCard job={job} key={idx + job.title + job.jobListId} />
            </GridItem>
          );
        })
      )}
    </Grid>
  );
}
