'use client';
import { useCallback, useState } from 'react';
import { JobLogSection, JobMain } from './ui';
import { useJob } from '@app/dashboard/job/hooks';
import { useRouter } from 'next/navigation';
import { Grid, Skeleton } from '@common/ui/atoms';
import { useParams, usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import cn from 'classnames';

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
    <div className="container mx-auto">
      {jobQueryData && (
        <div className="grid grid-cols-1 gap-4">
          <div>
            <button
              className="btn btn-primary gap-2 btn-outline"
              onClick={() => {
                router.back();
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
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
            {selectedTab === tabs.info && <JobMain job={jobQueryData} />}
            {selectedTab === tabs.log && (
              <JobLogSection jobId={jobQueryData.id} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
