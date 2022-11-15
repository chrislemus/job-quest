import { JobEntity } from '@core/job/entities';
import { PropsWithoutRef } from 'react';
import Link from 'next/link';

import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from '@common/ui/atoms';

interface JobCardProps {
  job: JobEntity;
}

export function JobCard(p: PropsWithoutRef<JobCardProps>) {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardActionArea href={`/dashboard/job/${p.job.id}`}>
        <CardContent>
          <Typography variant="button" noWrap display="block">
            {p.job.title}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {p.job.company}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
