import { JobEntity } from '@core/job/entities';
import { PropsWithoutRef } from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@common/ui/atoms';

interface JobCardProps {
  job: JobEntity;
}

export function JobCard(p: PropsWithoutRef<JobCardProps>) {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="button" noWrap display="block">
          {p.job.title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {p.job.location}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
