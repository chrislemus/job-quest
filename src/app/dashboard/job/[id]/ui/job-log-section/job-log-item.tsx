import { useDeleteJobLog } from '@app/dashboard/job-log/hooks';
import { useMemo, useState } from 'react';
import { JobLogEntity } from '@api/job-quest/job-log/job-log.entity';
import { useBoolean } from '@common/hooks';
import { MoreHorizIcon } from '@common/ui/icons';
import { UpdateJobLogForm } from './update-job-log-form';
import { Bars3Icon } from '@heroicons/react/20/solid';
import {
  Box,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from '@common/ui/atoms';

type JobLogItemProps = {
  jobLog: JobLogEntity;
};

export function JobLogItem(p: JobLogItemProps) {
  const updatedDate = useMemo(
    () => new Date(p.jobLog.updatedAt).toLocaleDateString(),
    [p.jobLog.updatedAt]
  );

  const deleteJobLogMutation = useDeleteJobLog();
  const deleteJobLog = () => deleteJobLogMutation.mutate(p.jobLog.id);

  const [displayForm, setDisplayForm] = useBoolean();

  return (
    <div className="flex flex-col ">
      <div className="flex">
        <div className="grow">
          <span className=" text-sm">{updatedDate}</span>
        </div>
        <div>
          <div className="dropdown dropdown-end">
            <label
              tabIndex={0}
              className="h-6 w-6 hover:cursor-pointer hover:opacity-70"
            >
              <Bars3Icon className="h-5 w-5 text-gray-400" />
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu menu-compact p-2 shadow bg-base-100 rounded-md"
            >
              <li>
                <button onClick={() => setDisplayForm.on()}>edit</button>
              </li>
              <li>
                <button onClick={() => deleteJobLog()}>delete</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div>
        {displayForm ? (
          <UpdateJobLogForm
            jobLog={p.jobLog}
            disableForm={setDisplayForm.off}
          />
        ) : (
          <p className="whitespace-pre-wrap break-all">{p.jobLog.content}</p>
        )}
      </div>
    </div>
  );
}
