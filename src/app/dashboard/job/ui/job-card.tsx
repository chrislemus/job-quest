import { JobEntity } from '@api/job-quest/job/job.entity';
import { getContrastText } from '@/common/utils';
import { queryClient } from '@/common/query-client';
import { useRouter } from 'next/navigation';
import { useDrag, useDrop } from 'react-dnd';
import { JobListDto } from '../dto';
import { jobQueryFn, jobQueryKey } from '@app/dashboard/job/hooks';
import { RefObject, useEffect, useMemo, useRef, useState } from 'react';

type JobCardProps = {
  job: JobEntity;
  updateJobList: (jobId: number, jobListData: JobListDto) => void;
};

export type JobCardItem = JobEntity & {
  ref: RefObject<HTMLDivElement>;
};

export const jobCardItemType = 'JobCard' as const;

export function JobCard(props: JobCardProps) {
  const { job, updateJobList } = props;

  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const jobCardId = `jobCard${job.id}`;
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

  const [{ isDragging }, drag] = useDrag<
    JobCardItem,
    unknown,
    { isDragging: boolean }
  >(() => ({
    type: jobCardItemType,
    item: { ...job, ref },
    collect: (m) => ({ isDragging: m.isDragging() }),
  }));

  const [externalDraggedItem, setExternalDraggedItem] = useState<{
    position: 'top' | 'bottom';
    itemHeight: string;
  }>();

  const [{ isOver }, drop] = useDrop<JobCardItem, unknown, { isOver: boolean }>(
    {
      accept: jobCardItemType,
      collect: (m) => ({ isOver: m.isOver() }),
      drop(item) {
        const cardPosition = externalDraggedItem?.position;
        if (cardPosition) {
          const beforeJobId = cardPosition === 'top' ? job.id : undefined;
          const afterJobId = cardPosition === 'bottom' ? job.id : undefined;
          const jobList = { beforeJobId, afterJobId };
          updateJobList(item.id, jobList);
        }
      },
      hover(item, monitor) {
        const dropElement = ref.current;
        const clientOffset = monitor.getClientOffset();
        const same = item?.id === job.id;
        if (!dropElement || !clientOffset || same) return;

        const prevElId = dropElement?.previousElementSibling?.id;
        const nextElId = dropElement?.nextElementSibling?.id;
        const itemElId = item?.ref?.current?.id;

        const { top, bottom } = dropElement.getBoundingClientRect();
        const hoverMiddleY = (bottom - top) / 2;
        const hoverClientY = clientOffset.y - top;
        const position = hoverClientY < hoverMiddleY ? 'top' : 'bottom';
        if (position === 'bottom' && nextElId === itemElId) return;
        if (position === 'top' && prevElId === itemElId) return;

        const itemHeight = `${item.ref.current?.offsetHeight}px`;
        setExternalDraggedItem({ position, itemHeight });
      },
    }
  );

  useEffect(() => {
    if (!isOver) setExternalDraggedItem(undefined);
  }, [isOver]);

  const blankEl = <div style={{ height: externalDraggedItem?.itemHeight }} />;

  drop(drag(ref));

  return (
    <div
      id={jobCardId}
      aria-disabled={isDragging}
      ref={ref}
      className="py-2 aria-disabled:opacity-10  aria-disabled:animate-pulse"
    >
      {externalDraggedItem?.position === 'top' && blankEl}
      <div
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
      {externalDraggedItem?.position === 'bottom' && blankEl}
    </div>
  );
}

export function JobCardLoading() {
  return <div className="h-24 w-full bg-gray-300 animate-pulse card" />;
}
