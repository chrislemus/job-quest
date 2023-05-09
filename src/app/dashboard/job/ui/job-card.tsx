import { JobEntity } from '@api/job-quest/job/job.entity';
import {
  PropsWithoutRef,
  RefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { getContrastText } from '@/common/utils';
import { queryClient } from '@/common/query-client';
import { useRouter } from 'next/navigation';
import { useDrag, useDrop } from 'react-dnd';
import {
  jobQueryFn,
  jobQueryKey,
  useUpdateJob,
} from '@app/dashboard/job/hooks';
import { useAppDispatch } from '../../store';
import { enqueueToast } from '../../toast/toast.slice';

type JobCardProps = {
  job: JobEntity;
};

type Item = JobEntity & { ref: RefObject<HTMLDivElement> };

export function JobCard({ job }: PropsWithoutRef<JobCardProps>) {
  const editJobMutation = useUpdateJob();
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag, dragPreview] = useDrag<Item>(
    () => ({
      type: 'jobCard',
      item: { ...job, ref },

      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [job]
  );

  const [externalDraggedItem, setExternalDraggedItem] = useState<{
    position: 'top' | 'bottom';
    itemHeight: string;
  }>();

  const [{ isOver }, drop] = useDrop<Item, unknown, { isOver: boolean }>({
    accept: ['jobCard'],
    collect(monitor) {
      const isOver = monitor.isOver();

      return {
        isOver,
      };
    },
    drop(item, monitor) {
      const cardPosition = externalDraggedItem?.position;
      if (cardPosition) {
        const beforeJobId = cardPosition === 'top' ? job.id : undefined;
        const afterJobId = cardPosition === 'bottom' ? job.id : undefined;

        editJobMutation
          .mutateAsync({
            jobId: item.id,
            data: { jobList: { beforeJobId, afterJobId } },
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
      // }
    },
    hover(item, monitor) {
      const dropElement = ref.current;
      // console.log(dropElement);
      // console.log(itm);
      const clientOffset = monitor.getClientOffset();
      if (!dropElement || !clientOffset || !item) {
        return;
      }
      if (item?.id === job.id) {
        return;
      }
      const prevEl = dropElement?.previousElementSibling;
      const nextEl = dropElement?.nextElementSibling;
      const itemId = `jobCard${item.id}`;

      // Determine rectangle on screen
      const hoverBoundingRect = dropElement?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      const position = hoverClientY < hoverMiddleY ? 'top' : 'bottom';
      if (position === 'bottom' && nextEl?.id == itemId) {
        return;
      }
      if (position === 'top' && prevEl?.id == itemId) {
        return;
      }

      setExternalDraggedItem({
        position,
        itemHeight: `${item.ref.current?.offsetHeight}px`,
      });
    },
  });

  useEffect(() => {
    if (!isOver) setExternalDraggedItem(undefined);
  }, [isOver]);

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

  // if (isDragging)
  //   return <div ref={dragPreview} id={`jobCardDragPreview${job.id}`} />;

  const blankEl = <div style={{ height: externalDraggedItem?.itemHeight }} />;
  return (
    <div
      id={`jobCard${job.id}`}
      aria-disabled={isDragging}
      ref={(el) => {
        drag(el);
        drop(el);
        ref.current = el;
      }}
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
