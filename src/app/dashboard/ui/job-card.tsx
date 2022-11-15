import { JobEntity } from '@core/job/entities';
import { PropsWithoutRef, useMemo } from 'react';
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from '@common/ui/atoms';
import { theme } from '@app/layout';

interface JobCardProps {
  job: JobEntity;
}

export function JobCard(p: PropsWithoutRef<JobCardProps>) {
  const backgroundColor = p.job.backgroundColor || '#ffff';
  const textColor = useMemo(() => {
    return theme.palette.getContrastText(backgroundColor);
  }, [backgroundColor]);

  return (
    <Card sx={{ minWidth: 275 }} style={{ backgroundColor }}>
      <CardActionArea href={`/dashboard/job/${p.job.id}`}>
        <CardContent>
          <Typography variant="button" noWrap display="block" color={textColor}>
            <strong>{p.job.title}</strong>
          </Typography>
          <Typography sx={{ mb: 1.5 }} color={textColor}>
            {p.job.company}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
