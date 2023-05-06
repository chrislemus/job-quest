import { useDeleteJobLog } from '@app/dashboard/job-log/hooks';
import { useMemo } from 'react';
import { JobLogEntity } from '@api/job-quest/job-log/job-log.entity';
import { useBoolean } from '@common/hooks';
import { UpdateJobLogForm } from './update-job-log-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';

type JobLogItemProps = {
  jobLog: JobLogEntity;
};

export function JobLogContent(p: JobLogItemProps) {
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
            <label tabIndex={0} className="h-5 w-5 hover:cursor-pointer">
              <FontAwesomeIcon
                className="h-5 w-5 text-gray-400"
                icon={faEllipsisVertical}
              />
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
