'use client';
import { useMemo, useState } from 'react';
import { JobCard, JobCardLoading } from './job-card';
import { useJobs, useUpdateJob } from '@app/dashboard/job/hooks';
import { JobListEntity } from '@/api/job-quest/job-list/job-list.entity';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { AddJobModal } from './add-job-modal';
import { useDrop } from 'react-dnd';
import { useAppDispatch } from '../../store';
import { enqueueToast } from '@app/dashboard/toast/toast.slice';
import { JobEntity } from '@/api/job-quest/job/job.entity';

export function JobListColumn({ jobList }: { jobList: JobListEntity }) {
  const editJobMutation = useUpdateJob();
  const dispatch = useAppDispatch();
  const [{ isOver, canDrop }, drop] = useDrop<JobEntity>(() => {
    return {
      accept: ['jobCard'],
      drop: (job) => {
        if (job.jobListId !== jobList.id) {
          editJobMutation
            .mutateAsync({
              jobId: job.id,
              data: { jobListId: jobList.id },
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
      },
      collect: (monitor) => {
        return {
          isOver: monitor.isOver(),
          canDrop: monitor.canDrop(),
        };
      },
    };
  });

  const [modalActive, setModalActive] = useState(false);
  const toggleModal = () => setModalActive((active) => !active);
  const jobsQuery = useJobs({ jobListId: jobList.id });
  const jobs = jobsQuery.data?.data;

  const jobCards = useMemo(() => {
    if (!(jobs && jobs.length > 0)) return;
    return jobs?.map((job) => {
      return <JobCard job={job} key={job.id} />;
    });
  }, [jobs]);

  const loadingCards = useMemo(() => {
    return Array.from({ length: 8 }, (_v, i) => <JobCardLoading key={i} />);
  }, []);

  const errorAlert = useMemo(() => {
    return (
      <JobListTabContentError
        refetchFn={async () => {
          await jobsQuery.refetch();
        }}
      />
    );
  }, []);

  return (
    <div
      className="h-full flex flex-col min-w-[18rem] max-w-[18rem] px-1 overflow-y-auto"
      ref={drop}
    >
      <div className="text-center sticky top-0 bg-white w-full">
        <h1 className=" text-lg font-semibold">{jobList.label}</h1>
        {jobs && (
          <>
            <p>{jobs?.length} Jobs</p>
            <button
              className="btn btn-ghost w-full text-gray-400 border-1 border-gray-300 text-2xl"
              onClick={toggleModal}
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
          data-can-drop={canDrop && isOver}
          className="h-full flex flex-col gap-4 overflow-y-auto overscroll-contain px-1 py-2 data-[can-drop=true]:bg-gray-100"
        >
          {jobsQuery.isLoading ? loadingCards : jobCards}
          <AddJobModal
            active={modalActive}
            toggle={toggleModal}
            defaultJobListId={jobList.id}
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
