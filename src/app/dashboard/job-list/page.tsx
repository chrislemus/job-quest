'use client';
import { Grid } from '@common/ui/atoms';
import { JobListTopMenu, JobListTabContent, JobListTabs } from './ui';

export default function JobListPage() {
  return (
    <Grid container>
      <Grid xs={12} paddingBottom={1}>
        <JobListTopMenu />
      </Grid>
      <Grid xs={12} paddingBottom={1}>
        <JobListTabs />
      </Grid>
      <Grid xs={12}>
        <JobListTabContent />
      </Grid>
    </Grid>
  );
}
