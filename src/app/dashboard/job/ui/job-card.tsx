import { JobEntity } from '@api/job-quest/job/job.entity';
import { PropsWithoutRef, useEffect, useMemo } from 'react';
import { getContrastText } from '@/common/utils';
import { queryClient } from '@/common/query-client';
import { useRouter } from 'next/navigation';
import { useDrag } from 'react-dnd';
import { jobQueryFn, jobQueryKey } from '@app/dashboard/job/hooks';

type JobCardProps = {
  job: JobEntity;
};

export function JobCard({ job }: PropsWithoutRef<JobCardProps>) {
  const [{ isDragging }, drag, dragPreview] = useDrag(
    () => ({
      type: 'jobCard',
      item: job,
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [job]
  );

  const router = useRouter();
  const backgroundColor = job.color || '#fff';

  useEffect(() => {
    queryClient.prefetchQuery({
      queryKey: jobQueryKey(job.id),
      queryFn: jobQueryFn,
    });
  }, []);
  const textColor = useMemo(() => {
    return getContrastText(backgroundColor);
  }, [backgroundColor]);

  if (isDragging) return <div ref={dragPreview} />;
  return (
    <div
      ref={drag}
      className="card bg-base-100 h-24"
      style={{ backgroundColor, color: textColor }}
      data-testid="job-card"
    >
      <div className="flex">
        <div
          className="flex-1 cursor-pointer text-left p-5 "
          onClick={() => router.push(`/dashboard/job/${job.id}`)}
        >
          <p className="font-bold">{job.title} </p>
          <p>{job.company}</p>
        </div>
      </div>
    </div>
  );
}

export function JobCardLoading() {
  return <div className="h-24 w-full bg-gray-300 animate-pulse card" />;
}
