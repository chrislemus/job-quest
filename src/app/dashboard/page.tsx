'use client';
import { PropsWithChildren, useEffect, useState } from 'react';
import { JobListMainNav, JobListPanel, JobListSubNav } from './_ui';
import { useJobListQuery } from './job-list/_query-hooks';
import { useJobsQuery } from './job/_query-hooks';
import { Grid } from '@common/ui/atoms';

function GridItem(p: PropsWithChildren<{}>) {
  return <Grid xs={5}>{p.children}</Grid>;
}

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

  // TODO: implement logic to only fetch if jobList is present
  // or leave optional, provided that all jobs will eventually be displayed.

  const jobsQuery = useJobsQuery({ jobListId: activeJobListId || undefined });

  return (
    <>
      <JobListMainNav
        jobList={JobsListQuery.data?.data || []}
        setActiveJobList={(a: number) => setActiveJobListId(a)}
        activeJobListId={activeJobListId}
        loading={JobsListQuery.isLoading}
      />

      <JobListSubNav />

      <Grid
        container
        style={{
          backgroundColor: 'red',
          overflowX: 'scroll',
          width: '100%',
          height: 'fit-content',
        }}
        wrap="nowrap"
        justifyContent="space-around"
      >
        <GridItem>
          <JobListPanel
            loading={
              JobsListQuery.isLoading || jobsQuery.isLoading ? 3 : undefined
            }
            jobs={jobsQuery.data?.data || []}
            jobLists={JobsListQuery.data?.data || []}
          />
        </GridItem>
        <GridItem>
          <JobListPanel
            loading={
              JobsListQuery.isLoading || jobsQuery.isLoading ? 3 : undefined
            }
            jobs={jobsQuery.data?.data || []}
            jobLists={JobsListQuery.data?.data || []}
          />
        </GridItem>
        <GridItem>
          <JobListPanel
            loading={
              JobsListQuery.isLoading || jobsQuery.isLoading ? 3 : undefined
            }
            jobs={jobsQuery.data?.data || []}
            jobLists={JobsListQuery.data?.data || []}
          />
        </GridItem>
      </Grid>
    </>
  );
}
