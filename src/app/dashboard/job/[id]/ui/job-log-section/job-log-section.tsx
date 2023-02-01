import { useUserProfile } from '@app/user/hooks';
import { PropsWithChildren, useMemo } from 'react';
import { useJobLogs } from '@app/dashboard/job-log/hooks';
import { JobLogItem } from './job-log-item';
import { AddJobLogForm } from './add-job-log-form';
import { Avatar, Grid } from '@common/ui/atoms';

function JobLogContainer(p: PropsWithChildren<{}>) {
  const user = useUserProfile();
  const firstNameInitial = user.data?.firstName?.[0] || '?';

  return (
    <Grid xs={12}>
      <Grid container columnSpacing={1} flexWrap="nowrap">
        <Grid>
          <Avatar sx={{ width: 24, height: 24 }}>{firstNameInitial}</Avatar>
        </Grid>
        <Grid flexGrow={1} style={{ width: '100%' }}>
          {p.children}
        </Grid>
      </Grid>
    </Grid>
  );
}

type JobLogSectionProps = {
  jobId: number;
};

export function JobLogSection(p: JobLogSectionProps) {
  const jobLogsQuery = useJobLogs(p.jobId);
  const jobLogsQueryData = jobLogsQuery.data?.data;

  const logs = useMemo(() => {
    return jobLogsQueryData?.map((jobLog) => (
      <JobLogContainer key={jobLog.id}>
        <JobLogItem jobLog={jobLog} />
      </JobLogContainer>
    ));
  }, [jobLogsQueryData]);

  return (
    <Grid container rowSpacing={2}>
      {logs}
      <JobLogContainer>
        <AddJobLogForm jobId={p.jobId} />
      </JobLogContainer>
    </Grid>
  );
}
