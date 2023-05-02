import { useUpdateJob } from '@app/dashboard/job/hooks';
import { JobEntity } from '@api/job-quest/job/job.entity';
import { JobListEntity } from '@api/job-quest/job-list/job-list.entity';
import { theme } from '@common/theme';
import { PropsWithoutRef, useMemo } from 'react';
import cn from 'classnames';
import Link from 'next/link';
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid';

type JobCardProps = {
  job: JobEntity;
  jobLists: JobListEntity[];
};

export function JobCard(p: PropsWithoutRef<JobCardProps>) {
  const editJobMutation = useUpdateJob();
  const backgroundColor = p.job.color || '#ffff';
  const textColor = useMemo(() => {
    return theme.palette.getContrastText(backgroundColor);
  }, [backgroundColor]);

  return (
    <div
      className="card bg-base-100 shadow-xl h-24"
      style={{ backgroundColor }}
      data-testid="job-card"
    >
      <div className="flex">
        <Link
          className="flex-1 cursor-pointer text-left p-5"
          href={`/dashboard/job/${p.job.id}`}
          style={{ color: textColor }}
        >
          <p className=" font-bold">{p.job.title} </p>
          <p>{p.job.company}</p>
        </Link>
        <div className="p-2">
          <div className="dropdown dropdown-left">
            <label
              tabIndex={0}
              className="btn btn-square btn-sm btn-ghost"
              style={{ color: textColor }}
              data-testid="job-list-menu"
            >
              <EllipsisVerticalIcon className="w-6 h-6" />
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu menu-compact p-2 shadow bg-base-100 rounded-box"
            >
              {editJobMutation.isLoading ? (
                <li className="animate-pulse">
                  <a>Loading...</a>
                </li>
              ) : (
                p.jobLists.map((list) => {
                  const disabled = p.job.jobListId === list.id;
                  return (
                    <li
                      key={list.id}
                      data-testid="job-list-menu-item"
                      className={cn({ disabled: disabled })}
                      onClick={() => {
                        if (!disabled)
                          editJobMutation.mutate({
                            jobId: p.job.id,
                            data: { jobListId: list.id },
                          });
                      }}
                    >
                      <a>{list.label}</a>
                    </li>
                  );
                })
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export function JobCardLoading() {
  return <div className="h-24 w-full bg-gray-300 animate-pulse card" />;
}
