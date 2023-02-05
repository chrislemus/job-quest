import { Button, Grid, Skeleton, Typography } from '@common/ui/atoms';
import { PropsWithChildren, useMemo } from 'react';
import { JobCard } from './job-card';
import { useJobs } from '@app/dashboard/job/hooks';
import { useActiveJobList, useJobLists } from '@app/dashboard/job-list/hooks';
import { Alert } from '@common/ui/atoms/alert';
import { useBoolean } from '@common/hooks';
import { AddJobModal } from './add-job-modal';

function GridItem(p: PropsWithChildren<{}>) {
  return (
    <Grid xs={12} sm={6} md={4} lg={3} padding={1}>
      {p.children}
    </Grid>
  );
}

export function JobListTabContent() {
  const [activeJobList] = useActiveJobList();
  const [activeModal, setActiveModal] = useBoolean();
  const JobsListQuery = useJobLists();
  const jobLists = JobsListQuery.data?.data || [];
  const jobsQuery = useJobs(
    { jobListId: activeJobList },
    { enabled: activeJobList === 0 || !!activeJobList }
  );
  const jobs = jobsQuery.data?.data;
  const loadingCards = useMemo(() => {
    return Array.from({ length: 8 }, (_v, i) => (
      <GridItem key={i}>
        <Skeleton variant="rectangular" height={150} />
      </GridItem>
    ));
  }, []);

  const jobsElements = useMemo(
    () =>
      jobs?.map((job) => {
        return (
          <GridItem key={job.id}>
            <JobCard job={job} jobLists={jobLists} />
          </GridItem>
        );
      }),
    [jobs]
  );

  return (
    <Grid container>
      {jobsQuery.isLoading ? (
        loadingCards
      ) : jobsQuery.isError ? (
        <Alert
          severity="error"
          sx={{ width: '100%' }}
          action={
            <Button
              color="inherit"
              size="small"
              loading={jobsQuery.isFetching}
              onClick={() => {
                jobsQuery.refetch();
              }}
            >
              Retry
            </Button>
          }
        >
          Failed to load job list nav.
        </Alert>
      ) : jobsElements ? (
        jobsElements
      ) : (
        <Grid xs={12} paddingTop={2}>
          <Typography textAlign="center">
            <Button
              aria-label="add-job"
              size="large"
              variant="contained"
              onClick={setActiveModal.toggle}
            >
              Add Job
            </Button>
          </Typography>
          <AddJobModal
            active={activeModal}
            toggleActive={setActiveModal.toggle}
          />
        </Grid>
      )}
    </Grid>
  );
}
