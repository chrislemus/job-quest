import { useUser } from '@app/user/hooks';
import { PropsWithChildren, useMemo } from 'react';
import { useJobLogs } from '@app/dashboard/job-log/hooks';
import { JobLogContent } from './job-log-content';
import { AddJobLogForm } from './add-job-log-form';
import { JobLogEntity } from '@/api/job-quest/job-log/job-log.entity';

type JobLogTabProps = {
  jobId: number;
  jobLogs: JobLogEntity[] | undefined;
};

export function JobLogTab(p: JobLogTabProps) {
  const jobLogsQuery = useJobLogs(p.jobId);
  const jobLogsQueryData = jobLogsQuery.data?.data;

  const logs = useMemo(() => {
    return p.jobLogs?.map((jobLog) => (
      <JobLogContainer key={jobLog.id}>
        <JobLogContent jobLog={jobLog} />
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
  const user = useUser();
  const firstNameInitial = user.data?.firstName?.[0] || '?';

  return (
    <div className="flex gap-2">
      <div>
        <div className="avatar placeholder">
          <div className=" bg-gray-300  text-white rounded-full w-6">
            <span>{firstNameInitial}</span>
          </div>
        </div>
      </div>
      <div className="grow">{p.children}</div>
    </div>
  );
}
