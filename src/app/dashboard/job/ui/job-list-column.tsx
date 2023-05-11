import { useMemo, useState } from 'react';
import { useAssignJobList, useJobs } from '@app/dashboard/job/hooks';
import { JobListEntity } from '@/api/job-quest/job-list/job-list.entity';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { useDrop } from 'react-dnd';
import {
  JobCard,
  JobCardItem,
  jobCardItemType,
  JobCardLoading,
} from './job-card';

type JobListColumnProps = {
  jobList: JobListEntity;
  toggleModal(defaultJobListId?: number): void;
};

export function JobListColumn(props: JobListColumnProps) {
  const assignJobList = useAssignJobList();
  const { jobList, toggleModal } = props;
  const jobsQuery = useJobs({ jobListId: jobList.id });
  const jobs = jobsQuery.data?.data;

  const [{ isOver: isOverColumnContainerDrop }, columnContainerDropRef] =
    useDrop(() => {
      return {
        accept: jobCardItemType,
        collect: (m) => ({ isOver: m.isOver() }),
      };
    }, []);

  const [_, emptyColumnSpaceDropRef] = useDrop<JobCardItem>(() => {
    return {
      accept: jobCardItemType,
      drop: (job) => {
        assignJobList(job.id, { id: jobList.id });
      },
    };
  }, []);

  const jobCards = useMemo(() => {
    if (!(jobs && jobs.length > 0)) return;
    return jobs?.map((job) => {
      return <JobCard job={job} key={job.id} />;
    });
  }, [jobsQuery.dataUpdatedAt]);

  const loadingCards = useMemo(() => {
    return Array.from({ length: 8 }, (_v, i) => <JobCardLoading key={i} />);
  }, []);

  const errorAlert = useMemo(() => {
    return <JobListTabContentError refetchFn={jobsQuery.refetch} />;
  }, []);

  return (
    <div className="h-full flex flex-col min-w-[18rem] max-w-[18rem] px-1 overflow-auto">
      <div className="text-center sticky top-0 bg-white w-full">
        <h1 className=" text-lg font-semibold">{jobList.label}</h1>
        {jobs && (
          <>
            <p>{jobs?.length} Jobs</p>
            <button
              className="btn btn-ghost w-full text-gray-400 border-1 border-gray-300 text-2xl"
              onClick={() => toggleModal(jobList.id)}
            >
              +
            </button>
          </>
        )}
      </div>
      {jobsQuery.isError ? (
        errorAlert
      ) : (
        <div
          data-can-drop={isOverColumnContainerDrop}
          ref={columnContainerDropRef}
          className="h-full flex flex-col overflow-auto overscroll-contain px-1 py-2 data-[can-drop=true]:bg-gray-100"
        >
          {jobsQuery.isLoading ? loadingCards : jobCards}
          {!jobsQuery.isLoading && (
            <div className="grow" ref={emptyColumnSpaceDropRef} />
          )}
        </div>
      )}
    </div>
  );
}

function JobListTabContentError(p: { refetchFn: () => Promise<any> }) {
  const [loading, setLoading] = useState(false);

  return (
    <div className="alert alert-error text-center shadow-lg text-error-content">
      <p>
        <FontAwesomeIcon className="h-6" icon={faCircleXmark} />
        Failed to load job list nav.
        <br />
      </p>
      <div className="flex-none">
        <button
          className="btn btn-ghost disabled:loading"
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
