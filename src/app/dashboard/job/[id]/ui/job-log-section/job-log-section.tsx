import { useUserProfile } from '@app/user/hooks';
import { PropsWithChildren, useMemo } from 'react';
import { useJobLogs } from '@app/dashboard/job-log/hooks';
import { JobLogItem } from './job-log-item';
import { AddJobLogForm } from './add-job-log-form';
import { Avatar, Grid } from '@common/ui/atoms';

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
    <div className="grid grid-cols-1 gap-4">
      {logs}
      <JobLogContainer>
        <AddJobLogForm jobId={p.jobId} />
      </JobLogContainer>
    </div>
  );
}

function JobLogContainer(p: PropsWithChildren<{}>) {
  const user = useUserProfile();
  const firstNameInitial = user.data?.firstName?.[0] || '?';

  return (
    <div className="flex gap-2">
      <div>
        <div className="avatar placeholder">
          <div className=" bg-gray-300  text-white rounded-full w-8">
            <span>{firstNameInitial}</span>
          </div>
        </div>
      </div>
      <div className="grow">{p.children}</div>
    </div>
  );
}
