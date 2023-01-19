'use client';
import { useEffect, useState } from 'react';
import { DeleteJobButton, JobLog, JobMain } from './_ui';
import { useJobQuery } from '@app/dashboard/job/_query-hooks';
import {
  Container,
  Divider,
  Grid,
  Skeleton,
  Typography,
} from '@common/ui/atoms';

interface JobProps {
  params: { id: string };
}

export default function Job(p: JobProps) {
  const jobId = parseInt(p.params.id);
  const [successCount, setSuccessCount] = useState(0);

  useEffect(() => {
    if (successCount > 0) {
      const timeOut = setTimeout(() => {
        setSuccessCount((count) => count - 1);
      }, 1000);
      return () => {
        clearTimeout(timeOut);
      };
    }
  }, [successCount]);

  const jobQuery = useJobQuery(jobId);
  const jobQueryData = jobQuery?.data?.data;

  if (jobQuery.isLoading)
    return (
      <Grid xs={12}>
        <Skeleton height={500} />
      </Grid>
    );

  return (
    <Container>
      {jobQueryData && (
        <>
          <Typography variant="h4">{jobQueryData.title}</Typography>
          <Typography variant="subtitle1">{jobQueryData.company}</Typography>

          <Grid container>
            <JobMain job={jobQueryData} />
          </Grid>
          <Divider sx={{ marginY: 6 }} />
          <JobLog />
          <Divider sx={{ marginY: 6 }} />
          <Grid xs={12}>
            <DeleteJobButton jobId={jobQueryData.id} />
          </Grid>
        </>
      )}
    </Container>
  );
}
