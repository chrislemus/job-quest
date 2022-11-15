import { JobEntity, JobListEntity } from '@core/job/entities';

export const jobList: JobListEntity[] = [
  { id: 1, label: 'Queue' },
  { id: 2, label: 'Applied' },
  { id: 3, label: 'Offer' },
];

export const jobs: JobEntity[] = [
  {
    id: 1,
    title: 'Principal Software',
    company: 'google',
    location: 'Raleigh, NC',
    jobListId: 1,
  },
  {
    id: 2,
    title: 'Backend Software Engineer',
    company: 'amazon',
    location: 'Los Angeles, CA',
    jobListId: 1,
  },
  {
    id: 3,
    title: 'FrontEnd Software Engineer',
    company: 'netflix',
    location: 'Ontario, NY',
    jobListId: 1,
  },
  {
    id: 4,
    title: 'Solutions Architect',
    company: 'Disney',
    location: 'Tampa, Fl',
    jobListId: 1,
  },
  {
    id: 5,
    title: 'Pending Title',
    company: 'Amazon',
    location: 'Tampa, Fl',
    jobListId: 2,
  },
  {
    id: 6,
    title: 'Janitor Senior',
    company: 'Walmart',
    location: 'Tampa, Fl',
    jobListId: 2,
  },
  {
    id: 7,
    title: 'Staff Solution Eng.',
    company: 'Berry Nimble',
    location: 'Tampa, Fl',
    jobListId: 2,
  },
  {
    id: 8,
    title: 'OFFer-Principal Software',
    company: 'Target',
    location: 'Raleigh, NC',
    jobListId: 3,
  },
  {
    id: 9,
    title: 'Need-Backend Software Engineer',
    company: 'BB&T',
    location: 'Los Angeles, CA',
    jobListId: 3,
  },
  {
    id: 9,
    title: 'FrontEnd Software Engineer',
    company: 'Bank of America',
    location: 'Ontario, NY',
    jobListId: 3,
  },
  {
    id: 10,
    title: 'Solutions Architect',
    company: 'Jet',
    location: 'Tampa, Fl',
    jobListId: 3,
  },
];
