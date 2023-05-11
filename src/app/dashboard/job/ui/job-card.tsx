import { JobEntity } from '@api/job-quest/job/job.entity';
import { getContrastText } from '@/common/utils';
import { queryClient } from '@/common/query-client';
import { useDrag, useDrop } from 'react-dnd';
import { RefObject, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import {
  jobQueryFn,
  jobQueryKey,
  useAssignJobList,
} from '@app/dashboard/job/hooks';

type JobCardProps = { job: JobEntity };
export type JobCardItem = JobEntity & { ref: RefObject<HTMLDivElement> };
export const jobCardItemType = 'JobCard' as const;

export function JobCard(props: JobCardProps) {
  const assignJobList = useAssignJobList();
  const { job } = props;
  const ref = useRef<HTMLDivElement>(null);
  const jobCardId = `jobCard${job.id}`;
  const backgroundColor = job.color || '#fff';

  useEffect(() => {
    queryClient.prefetchQuery({
      queryKey: jobQueryKey(job.id),
      queryFn: jobQueryFn,
    });
  }, []);

  const textColor = useMemo(
    () => getContrastText(backgroundColor),
    [backgroundColor]
  );

  const [{ isDragging }, drag] = useDrag(() => ({
    type: jobCardItemType,
    item: { ...job, ref } as JobCardItem,
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
          assignJobList(item.id, jobList);
        }
      },
      hover(item, monitor) {
        const dropElement = ref.current;
        const clientOffset = monitor.getClientOffset();
        if (!dropElement || !clientOffset || item?.id === job.id) return;

        const { top, bottom } = dropElement.getBoundingClientRect();
        const hoverMiddleY = (bottom - top) / 2;
        const hoverClientY = clientOffset.y - top;
        const position = hoverClientY < hoverMiddleY ? 'top' : 'bottom';

        const prevElId = dropElement?.previousElementSibling?.id;
        const nextElId = dropElement?.nextElementSibling?.id;
        const itemElId = item?.ref?.current?.id;
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
      <Link
        href={`/dashboard/job/${job.id}`}
        className="card bg-base-100 h-24"
        style={{ backgroundColor, color: textColor }}
        data-testid="job-card"
      >
        <div className="flex">
          <div className="flex-1 cursor-pointer text-left p-5 ">
            <p className="font-bold">{job.title} </p>
            <p>{job.company}</p>
          </div>
        </div>
      </Link>
      {externalDraggedItem?.position === 'bottom' && blankEl}
    </div>
  );
}

export function JobCardLoading() {
  return <div className="h-24 w-full bg-gray-300 animate-pulse card my-2" />;
}
