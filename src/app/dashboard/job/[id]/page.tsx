'use client';
import { Grid, Skeleton, Typography } from '@common/ui/atoms';
import { jobService } from '@core/job/services';
import { useQuery } from '@tanstack/react-query';

interface JobProps {
  params: { id: string };
}
export default function Job(p: JobProps) {
  const jobId = parseInt(p.params.id);
  const job = useQuery({
    queryKey: ['job', jobId],
    queryFn: () => jobService.findById(jobId),
  });

  return (
    <Grid container paddingTop={2}>
      {job.isLoading ? (
        <Grid xs={12}>
          <Skeleton height={500} />
        </Grid>
      ) : (
        <>
          <Grid xs={12}>
            <Typography variant="h3" component="h1">
              {job?.data?.title}
            </Typography>
            <Typography variant="h3" component="h1">
              {job?.data?.title}
            </Typography>
          </Grid>
          <Grid></Grid>
        </>
      )}
    </Grid>
  );
}
