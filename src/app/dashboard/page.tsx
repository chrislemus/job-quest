'use client';

import {
  Container,
  Grid,
  Box,
  Typography,
  Card,
  CardActions,
  CardContent,
  TabContext,
  TabList,
  TabPanel,
  Tab,
  Button,
} from '@common/ui/atoms';
import { useMutation } from '@tanstack/react-query';
import { PropsWithoutRef, SyntheticEvent, useMemo, useState } from 'react';
import { Job, jobList, jobs } from './jobs.const';

export default function Dashboard() {
  const [activeJobList, setActiveJobList] = useState(`${jobList[0].id}`);
  const onActiveJobListChange = (_e: SyntheticEvent, newValue: string) => {
    setActiveJobList(newValue);
  };

  const JobListMut = useMutation({
    mutationKey: ['jobList'],
    mutationFn: () => {
      return new Promise((res) => {
        res(jobList);
      });
    },
  });

  const filteredJobsList = useMemo(
    () => jobs.filter((j) => `${j.jobListId}` === activeJobList),
    [activeJobList]
  );

  return (
    <Container maxWidth={false}>
      <main>
        <TabContext value={activeJobList}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', pt: 3 }}>
            <TabList
              onChange={onActiveJobListChange}
              aria-label="Job List Nav"
              centered
            >
              {jobList.map((j) => {
                return <Tab label={j.label} value={`${j.id}`} key={j.id} />;
              })}
            </TabList>
          </Box>
          <TabPanel value={activeJobList}>
            <JobList jobs={filteredJobsList} />
          </TabPanel>
        </TabContext>
      </main>
    </Container>
  );
}

const JobList = (p: PropsWithoutRef<{ jobs: Job[] }>) => {
  return (
    <>
      <Grid
        container
        spacing={6}
        justifyContent={{ xs: 'center', sm: 'flex-start' }}
      >
        {p.jobs.map((job, idx) => {
          return (
            <JobListItem job={job} key={idx + job.title + job.jobListId} />
          );
        })}
      </Grid>
    </>
  );
};

function JobListItem(p: PropsWithoutRef<{ job: Job }>) {
  return (
    <Grid xs={12} sm={6} md={4} lg={3}>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography variant="h6" component="div">
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
    </Grid>
  );
}
