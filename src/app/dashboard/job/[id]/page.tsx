'use client';
import { useCallback } from 'react';
import { JobLogTab, JobInfoTab } from './ui';
import { useJob } from '@app/dashboard/job/hooks';
import { useParams, usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { XCircleIcon } from '@heroicons/react/20/solid';

const tabs = {
  info: 'Info',
  log: 'Log',
} as const;

export default function JobPage() {
  const jobId = +useParams().id;
  const searchParams = useSearchParams();
  const selectedTab = searchParams.get('tab') || tabs.info;
  const jobQuery = useJob(jobId);

  const jobQueryData = jobQuery?.data?.data;

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

  if (jobQuery.isError || !jobQueryData)
    return <JobPageError refetchFn={() => jobQuery.refetch()} />;

  return (
    <div className="grid grid-cols-1 gap-4">
      <div>
        <h1 className="font-semibold text-3xl">{jobQueryData.title} </h1>
        <p className="mt-1 max-w-2xl text-xl">{jobQueryData.company} </p>
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
        {selectedTab === tabs.info && <JobInfoTab job={jobQueryData} />}
        {selectedTab === tabs.log && <JobLogTab jobId={jobQueryData.id} />}
      </div>
    </div>
  );
}

function JobPageError(p: { refetchFn: () => void }) {
  const { refetchFn } = p;
  return (
    <div className="alert alert-error shadow-lg">
      <div>
        <XCircleIcon className="flex-shrink-0 h-6 w-6" />
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
