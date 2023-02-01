import { Box, Skeleton, Tab, Tabs } from '@common/ui/atoms';
import { PropsWithoutRef, SyntheticEvent, useMemo } from 'react';
import { useJobLists } from '@app/dashboard/job-list/hooks';

type JobListMainNavProps = {
  setActiveJobList: (a: number) => void;
  activeJobListId?: number;
};

export function JobListMainNav(p: PropsWithoutRef<JobListMainNavProps>) {
  const JobsListQuery = useJobLists();
  const jobLists = JobsListQuery.data?.data || [];

  return (
    <Box
      sx={{
        borderBottom: 1,
        borderColor: JobsListQuery.isLoading ? 'transparent' : 'divider',
      }}
    >
      {JobsListQuery.isLoading || !p.activeJobListId ? (
        <>
          <br />
          <Skeleton variant="rectangular" height={500} />
        </>
      ) : (
        <Tabs
          onChange={(_e: SyntheticEvent, newValue: number) => {
            p.setActiveJobList(newValue);
          }}
          aria-label="Job List Nav"
          value={p.activeJobListId}
          variant="scrollable"
          scrollButtons="auto"
        >
          {jobLists.map((j) => {
            return <Tab label={j.label} value={j.id} key={j.id} />;
          })}
        </Tabs>
      )}
    </Box>
  );
}
