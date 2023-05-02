'use client';
import { useCallback } from 'react';
import { JobLogTab, JobInfoTab } from './ui';
import { useJob } from '@app/dashboard/job/hooks';
import { useRouter } from 'next/navigation';
import { Grid, Skeleton } from '@common/ui/atoms';
import { useParams, usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import cn from 'classnames';
import { ChevronLeftIcon } from '@heroicons/react/20/solid';

const tabs = {
  info: 'Info',
  log: 'Log',
} as const;

export default function Job() {
  const router = useRouter();
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
    return (
      <Grid xs={12}>
        <Skeleton height={500} />
      </Grid>
    );

  return (
    <div className="container mx-auto min-h-screen">
      {jobQueryData && (
        <div className="grid grid-cols-1 gap-4">
          <div>
            <button
              className="btn btn-primary btn-outline btn-sm"
              onClick={() => {
                router.back();
              }}
            >
              <ChevronLeftIcon className="w-6 h-6" />
              Back
            </button>
          </div>
          <div>
            <h1 className="font-semibold text-3xl">{jobQueryData.title} </h1>
            <p className="mt-1 max-w-2xl text-xl">{jobQueryData.company} </p>
          </div>
          <div className="tabs">
            {Object.values(tabs).map((tab) => {
              return (
                <Link
                  key={tab}
                  className={cn('tab tab-bordered tab-lg', {
                    'tab-active': selectedTab === tab,
                  })}
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
      )}
    </div>
  );
}
