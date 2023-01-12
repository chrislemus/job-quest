'use client';
import { ApiErrorRes, ApiOkRes } from '@common/api/job-quest/interface';
import { Container, Grid, Typography } from '@common/ui/atoms';
import { UseQueryResult } from '@tanstack/react-query';
import { PropsWithChildren } from 'react';
import { JobEntity } from '../../_entities';

export function JobLayout(
  p: PropsWithChildren<{
    jobQuery: UseQueryResult<ApiOkRes<JobEntity>, ApiErrorRes>;
  }>
) {
  const jobQueryData = p.jobQuery?.data?.data;

  return (
    <Container>
      <Typography variant="h4">{jobQueryData?.title}</Typography>
      <Typography variant="subtitle1">{jobQueryData?.company}</Typography>
      <Grid container paddingBottom={6}>
        {p.children}
      </Grid>
    </Container>
  );
}
