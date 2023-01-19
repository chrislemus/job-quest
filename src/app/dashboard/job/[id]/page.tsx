'use client';

import { useEffect, useState } from 'react';
import { DeleteJobButton, JobMain } from './_ui';
import { useJobQuery } from '@app/dashboard/job/_query-hooks';
import { useUserProfile } from '@app/user/_query-hooks';
import {
  Avatar,
  Box,
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

          <Grid container paddingBottom={6}>
            <JobMain job={jobQueryData} />
          </Grid>
          <Divider />
          <JobLogContainer />
          <Divider />

          <Grid xs={12} paddingTop={6}>
            <DeleteJobButton jobId={jobQueryData.id} />
          </Grid>
        </>
      )}
    </Container>
  );
}

function JobLogContainer() {
  const user = useUserProfile();
  const firstNameInitial = user.data?.firstName?.[0] || '?';

  return (
    <Grid container paddingY={6}>
      <Grid container rowSpacing={1} columnSpacing={1}>
        <Grid>
          <Avatar sx={{ width: 24, height: 24 }}>{firstNameInitial}</Avatar>
        </Grid>
        <Grid flexGrow={1}>Cdwedwe</Grid>
      </Grid>
      <Box>dwe</Box>
    </Grid>
  );
}
