import {
  jobQueryFn,
  jobQueryKey,
  useUpdateJob,
} from '@app/dashboard/job/hooks';
import { JobEntity } from '@api/job-quest/job/job.entity';
import { PropsWithoutRef, useEffect, useMemo } from 'react';
import cn from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { getContrastText } from '@/common/utils';
import { queryClient } from '@/common/query-client';
import { useAppDispatch } from '../../store';
import { enqueueToast } from '@app/dashboard/toast/toast.slice';
import { useRouter } from 'next/navigation';
import { useJobLists } from '../../job-list/hooks';

type JobCardProps = {
  job: JobEntity;
};

export function JobCard(p: PropsWithoutRef<JobCardProps>) {
  const JobsListQuery = useJobLists();
  const jobLists = JobsListQuery.data?.data;
  const router = useRouter();
  const editJobMutation = useUpdateJob();
  const backgroundColor = p.job.color || '#fff';
  const dispatch = useAppDispatch();

  useEffect(() => {
    queryClient.prefetchQuery({
      queryKey: jobQueryKey(p.job.id),
      queryFn: jobQueryFn,
    });
  }, []);

  const textColor = useMemo(() => {
    return getContrastText(backgroundColor);
  }, [backgroundColor]);

  return (
    <div
      className="card bg-base-100 h-24"
      style={{ backgroundColor, color: textColor }}
      data-testid="job-card"
    >
      <div className="flex">
        <div
          className="flex-1 cursor-pointer text-left p-5 "
          onClick={() => router.push(`/dashboard/job/${p.job.id}`)}
        >
          <p className="font-bold">{p.job.title} </p>
          <p>{p.job.company}</p>
        </div>
        <div className="p-2">
          <div className="dropdown dropdown-left">
            <label
              tabIndex={0}
              className="btn btn-square btn-sm btn-ghost"
              data-testid="job-list-menu"
            >
              <FontAwesomeIcon icon={faEllipsisVertical} className="w-4 h-4" />
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu menu-compact p-2 shadow bg-base-100 rounded-box text-base-content"
            >
              {editJobMutation.isLoading || !jobLists ? (
                <li className="animate-pulse">
                  <a>Loading...</a>
                </li>
              ) : (
                jobLists.map((list) => {
                  const selected = p.job.jobListId === list.id;
                  return (
                    <li
                      key={list.id}
                      data-testid="job-list-menu-item"
                      aria-selected={selected}
                      className={cn({ disabled: selected })}
                      onClick={() => {
                        if (!selected) {
                          editJobMutation
                            .mutateAsync({
                              jobId: p.job.id,
                              data: { jobListId: list.id },
                            })
                            .catch((e) => {
                              dispatch(
                                enqueueToast({
                                  message: 'Failed to change job list',
                                  type: 'error',
                                })
                              );
                            });
                        }
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
