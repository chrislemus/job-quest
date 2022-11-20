import { JobEntity } from '@core/job/entities';
import type { Identifier, XYCoord } from 'dnd-core';
import type { FC } from 'react';
import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { PropsWithoutRef, useMemo } from 'react';
import {
  Card,
  CardActionArea,
  CardContent,
  IconButton,
  Typography,
} from '@common/ui/atoms';
import { theme } from '@app/layout';
import Link from 'next/link';
import { EditIcon } from '@common/ui/icons';

// import { ItemTypes } from './ItemTypes';
export const ItemTypes = {
  CARD: 'card',
};

const style = {
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  backgroundColor: 'white',
  cursor: 'move',
};

export interface CardProps {
  id: any;
  text: string;
  index: number;
  job: JobEntity;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
}

interface DragItem {
  index: number;
  id: string;
  type: string;
}

export const JobCard: FC<CardProps> = (p) => {
  const { id, text, index, moveCard } = p;

  const backgroundColor = p.job.color || '#ffff';
  const textColor = useMemo(() => {
    return theme.palette.getContrastText(backgroundColor);
  }, [backgroundColor]);

  const ref = useRef<HTMLDivElement>(null);
  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: ItemTypes.CARD,
    collect(monitor) {
      return { handlerId: monitor.getHandlerId() };
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) return;

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: () => {
      return { id, index };
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0.5 : 1;
  drag(drop(ref));
  // return (
  //   <div ref={ref} style={{ ...style, opacity }} data-handler-id={handlerId}>
  //     {text}
  //   </div>
  // );
  return (
    <Card
      ref={ref}
      sx={{ minWidth: 275 }}
      style={{ backgroundColor, opacity }}
      data-handler-id={handlerId}
    >
      <CardActionArea>
        <CardContent>
          <Typography variant="button" noWrap display="block" color={textColor}>
            <strong>{p.job.title}</strong>
          </Typography>
          <Typography sx={{ mb: 1.5 }} color={textColor}>
            {p.job.company}
          </Typography>
        </CardContent>
        <IconButton href={`/dashboard/job/${p.job.id}`}>
          <EditIcon />
        </IconButton>
      </CardActionArea>
    </Card>
  );
};

// import { JobEntity } from '@core/job/entities';
// import { PropsWithoutRef, useMemo } from 'react';
// import {
//   Card,
//   CardActionArea,
//   CardContent,
//   Typography,
// } from '@common/ui/atoms';
// import { theme } from '@app/layout';
// import Link from 'next/link';

// interface JobCardProps {
//   job: JobEntity;
// }

// export function JobCard(p: PropsWithoutRef<JobCardProps>) {
//   const backgroundColor = p.job.color || '#ffff';
//   const textColor = useMemo(() => {
//     return theme.palette.getContrastText(backgroundColor);
//   }, [backgroundColor]);

//   return (
//     <Card sx={{ minWidth: 275 }} style={{ backgroundColor }}>
//       <CardActionArea href={`/dashboard/job/${p.job.id}`} component={Link}>
//         <CardContent>
//           <Typography variant="button" noWrap display="block" color={textColor}>
//             <strong>{p.job.title}</strong>
//           </Typography>
//           <Typography sx={{ mb: 1.5 }} color={textColor}>
//             {p.job.company}
//           </Typography>
//         </CardContent>
//       </CardActionArea>
//     </Card>
//   );
// }
