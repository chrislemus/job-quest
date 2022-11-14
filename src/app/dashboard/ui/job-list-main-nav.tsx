import { Box, Skeleton, Tab, Tabs } from '@common/ui/atoms';
import { JobListEntity } from '@core/job/entities';
import { PropsWithoutRef, SyntheticEvent } from 'react';

interface JobListMainNavProps {
  setActiveJobList: (a: number) => void;
  jobList: JobListEntity[];
  activeJobListId?: number;
  loading?: boolean;
}

export function JobListMainNav(p: PropsWithoutRef<JobListMainNavProps>) {
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
          centered
        >
          {p.jobList.map((j) => {
            return <Tab label={j.label} value={j.id} key={j.id} />;
          })}
        </Tabs>
      )}
    </Box>
  );
}
