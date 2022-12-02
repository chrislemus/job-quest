import { Box, Skeleton, Tab, Tabs } from '@common/ui/atoms';
import { JobListEntity } from '@app/dashboard/job-list/_entities';
import { PropsWithoutRef, SyntheticEvent, useMemo } from 'react';

interface JobListMainNavProps {
  setActiveJobList: (a: number) => void;
  jobList: JobListEntity[];
  activeJobListId?: number;
  loading?: boolean;
}

export function JobListMainNav(p: PropsWithoutRef<JobListMainNavProps>) {
  const sortedJobList = useMemo(() => {
    return p.jobList.sort((a, b) => a.order - b.order);
  }, [p.jobList]);

  return (
    <Box
      sx={{
        borderBottom: 1,
        borderColor: p.loading ? 'transparent' : 'divider',
      }}
    >
      {p.loading || !p.activeJobListId ? (
        <Skeleton variant="rectangular" height={60} />
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
          {sortedJobList.map((j) => {
            return <Tab label={j.label} value={j.id} key={j.id} />;
          })}
        </Tabs>
      )}
    </Box>
  );
}
