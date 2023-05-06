'use client';
import { useCallback } from 'react';
import { JobLogTab, JobInfoTab } from './ui';
import { useJob } from '@app/dashboard/job/hooks';
import { useParams, usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { useJobLogs } from '../../job-log/hooks';

const tabs = {
  info: 'Info',
  log: 'Log',
} as const;

export default function JobPage() {
  const jobId = +useParams().id;
  const searchParams = useSearchParams();
  const selectedTab = searchParams.get('tab') || tabs.info;
  const jobQuery = useJob(jobId);
  const job = jobQuery?.data?.data;

  const jobLogsQuery = useJobLogs(jobId);
  const jobLogs = jobLogsQuery?.data?.data;

  const pathname = usePathname();

  const qs = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  if (jobQuery.isLoading)
    return <div className="h-screen w-full bg-gray-200 animate-pulse card" />;

  if (jobQuery.isError || !job)
    return <JobPageError refetchFn={() => jobQuery.refetch()} />;

  return (
    <div className="grid grid-cols-1 gap-4">
      <div>
        <h1 className="font-semibold text-3xl">{job.title} </h1>
        <p className="mt-1 max-w-2xl text-xl">{job.company} </p>
      </div>
      <div className="tabs">
        {Object.values(tabs).map((tab) => {
          return (
            <Link
              key={tab}
              aria-selected={selectedTab === tab}
              className="tab tab-bordered tab-lg aria-selected:tab-active"
              replace
              href={`${pathname}?${qs('tab', tab)}`}
            >
              {tab}
            </Link>
          );
        })}
      </div>
      <div>
        {selectedTab === tabs.info && <JobInfoTab job={job} />}
        {selectedTab === tabs.log && (
          <JobLogTab jobId={job.id} jobLogs={jobLogs} />
        )}
      </div>
    </div>
  );
}

function JobPageError(p: { refetchFn: () => void }) {
  const { refetchFn } = p;
  return (
    <div className="alert alert-error shadow-lg">
      <div>
        <FontAwesomeIcon
          className="flex-shrink-0 h-6 w-6"
          icon={faCircleXmark}
        />
        <span>Error! Failed to load job details.</span>
      </div>
      <div className="flex-none">
        <button className="btn btn-sm disabled:loading" onClick={refetchFn}>
          Try again
        </button>
      </div>
    </div>
  );
}
