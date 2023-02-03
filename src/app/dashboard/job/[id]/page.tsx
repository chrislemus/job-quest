'use client';
import { useState } from 'react';
import { JobLogSection, JobMain } from './ui';
import { useJob } from '@app/dashboard/job/hooks';
import { ArrowBackIosIcon } from '@common/ui/icons';
import Link from 'next/link';
import {
  Button,
  Container,
  Grid,
  Skeleton,
  Tab,
  Tabs,
  Typography,
} from '@common/ui/atoms';

type JobProps = {
  params: { id: string };
};

const tabs = {
  info: 'Info',
  logs: 'Logs',
} as const;

type TabKeys = typeof tabs[keyof typeof tabs];

export default function Job(p: JobProps) {
  const jobId = parseInt(p.params.id);
  const jobQuery = useJob(jobId);
  const jobQueryData = jobQuery?.data?.data;
  const [activeTab, setActiveTab] = useState<TabKeys>(tabs.info);

  if (jobQuery.isLoading)
    return (
      <Grid xs={12}>
        <Skeleton height={500} />
      </Grid>
    );
  return (
    <Container>
      {jobQueryData && (
        <Grid container>
          <Grid xs={12}>
            <Button
              href="/dashboard"
              startIcon={<ArrowBackIosIcon />}
              LinkComponent={Link}
            >
              Back
            </Button>
          </Grid>
          <Grid xs={12}>
            <Typography variant="h4">{jobQueryData.title}</Typography>
            <Typography variant="subtitle1">{jobQueryData.company}</Typography>
          </Grid>
          <Grid xs={12}>
            <Tabs
              onChange={(_e, newValue: TabKeys) => {
                setActiveTab(newValue);
              }}
              aria-label="Job Nav"
              value={activeTab}
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab label={tabs.info} value={tabs.info} />
              <Tab label={tabs.logs} value={tabs.logs} />
            </Tabs>
          </Grid>
          <Grid xs={12} paddingY={2}>
            {activeTab === 'Info' && <JobMain job={jobQueryData} />}
            {activeTab === 'Logs' && <JobLogSection jobId={jobQueryData.id} />}
          </Grid>
        </Grid>
      )}
    </Container>
  );
}
