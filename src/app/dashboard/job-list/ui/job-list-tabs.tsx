import { Box, Button, Skeleton, Tab, Tabs } from '@common/ui/atoms';
import { SyntheticEvent, useMemo } from 'react';
import { useActiveJobList, useJobLists } from '@app/dashboard/job-list/hooks';
import { Alert } from '@common/ui/atoms/alert';

export function JobListTabs() {
  const [activeJobList, setActiveJobList] = useActiveJobList();
  const jobsListQuery = useJobLists();
  const jobLists = jobsListQuery.data?.data || [];

  const jobListTabs = useMemo(
    () =>
      jobLists.map((j) => {
        return <Tab label={j.label} value={j.id} key={j.id} />;
      }),
    [jobLists]
  );

  if (jobsListQuery.isLoading)
    return <Skeleton variant="rectangular" height={80} />;
  const noData = !jobLists || !activeJobList;
  if (jobsListQuery.isError || noData)
    return (
      <Alert
        severity="error"
        action={
          <Button
            color="inherit"
            size="small"
            loading={jobsListQuery.isFetching}
            onClick={() => {
              jobsListQuery.refetch();
            }}
          >
            Retry
          </Button>
        }
      >
        Failed to load job list tabs
      </Alert>
    );

  return (
    <Box
      sx={{
        borderBottom: 1,
        borderColor: jobsListQuery.isLoading ? 'transparent' : 'divider',
      }}
    >
      {jobLists && activeJobList && (
        <Tabs
          onChange={(_e: SyntheticEvent, jobListId: number) => {
            setActiveJobList(jobListId);
          }}
          aria-label="Job List Nav"
          value={activeJobList}
          variant="scrollable"
          scrollButtons="auto"
        >
          {jobListTabs}
        </Tabs>
      )}
    </Box>
  );
}
