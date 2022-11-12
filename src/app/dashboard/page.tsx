'use client';

import { Container, Grid, Box } from '@common/ui/atoms';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Tab } from '@mui/material';
import { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function Dashboard() {
  const [value, setValue] = useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const CGrid = () => {
    return (
      <Grid xs={12} sm={6} md={4} lg={3}>
        <BasicCard />
      </Grid>
    );
  };
  <Grid xs={12} sm={6} md={4} lg={3}>
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          Creative Solutions
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Raleigh, NC (Remote)
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>{' '}
  </Grid>;

  const CPanelContent = () => {
    return (
      <>
        <Grid
          container
          spacing={6}
          justifyContent={{ xs: 'center', sm: 'flex-start' }}
        >
          <CGrid />
          <CGrid />
          <CGrid />
          <CGrid />
        </Grid>
      </>
    );
  };

  return (
    <Container maxWidth={false}>
      <main>
        {/* <h1>hi</h1>
      <p>This is some text to view </p> */}
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', pt: 3 }}>
            <TabList
              onChange={handleChange}
              aria-label="lab API tabs example"
              centered
            >
              <Tab label="Queue" value="1" />
              <Tab label="Applied" value="2" />
              <Tab label="Offer" value="3" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <CPanelContent />
          </TabPanel>
          <TabPanel value="2">
            <CPanelContent />
          </TabPanel>
          <TabPanel value="3">
            <CPanelContent />
          </TabPanel>
        </TabContext>
      </main>
    </Container>
  );
}

function BasicCard() {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        {/* <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Word of the Day
        </Typography> */}
        <Typography variant="h5" component="div">
          Creative Solutions
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Raleigh, NC (Remote)
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
