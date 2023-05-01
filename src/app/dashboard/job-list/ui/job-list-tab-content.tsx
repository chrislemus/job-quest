import { useMemo, useState } from 'react';
import { JobCard, JobCardLoading } from './job-card';
import { useJobs } from '@app/dashboard/job/hooks';
import { useActiveJobList, useJobLists } from '@app/dashboard/job-list/hooks';
import { useBoolean } from '@common/hooks';
import { AddJobModal } from './add-job-modal';
import cn from 'classnames';

export function JobListTabContent() {
  const [activeJobList] = useActiveJobList();
  const [activeModal, setActiveModal] = useBoolean();
  const JobsListQuery = useJobLists();
  const jobLists = JobsListQuery.data?.data || [];
  const jobsQuery = useJobs(
    { jobListId: activeJobList },
    { enabled: activeJobList === 0 || !!activeJobList }
  );
  const jobs = jobsQuery.data?.data;
  const loadingCards = useMemo(() => {
    return Array.from({ length: 8 }, (_v, i) => <JobCardLoading key={i} />);
  }, []);

  const jobsElements = useMemo(() => {
    if (!(jobs && jobs?.length >= 1)) return;
    return jobs?.map((job) => {
      return <JobCard job={job} jobLists={jobLists} key={job.id} />;
    });
  }, [jobs]);

  if (jobsQuery.isError) {
    return (
      <JobListTabContentError
        refetchFn={async () => {
          await jobsQuery.refetch();
        }}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {jobsQuery.isLoading ? (
        loadingCards
      ) : jobsElements ? (
        jobsElements
      ) : (
        <div>
          <button
            aria-label="add-job"
            className="btn btn-primary"
            onClick={setActiveModal.toggle}
          >
            Add
          </button>
          <AddJobModal
            active={activeModal}
            toggleActive={setActiveModal.toggle}
          />
        </div>
      )}
    </div>
  );
}

function JobListTabContentError(p: { refetchFn: () => Promise<void> }) {
  const [loading, setLoading] = useState(false);

  return (
    <div className="alert alert-error text-center shadow-lg text-error-content">
      <p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-current flex-shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        Failed to load job list nav.
        <br />
      </p>
      <div className="flex-none">
        <button
          className={cn('btn btn-ghost', { loading: loading })}
          disabled={loading}
          onClick={async () => {
            setLoading(true);
            try {
              await p.refetchFn();
            } catch (error) {}
            setLoading(false);
          }}
        >
          Retry
        </button>
      </div>
    </div>
  );
}
