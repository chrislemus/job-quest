import { JobEntity, JobListEntity } from '@core/job/entities';
import { jobBackgroundColors } from '../const';

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

    backgroundColor: jobBackgroundColors[0],
    jobListId: 1,
  },
  {
    id: 2,
    title: 'Backend Software Engineer',
    company: 'amazon',
    location: 'Los Angeles, CA',

    backgroundColor: jobBackgroundColors[1],
    jobListId: 1,
  },
  {
    id: 3,
    title: 'FrontEnd Software Engineer',
    company: 'netflix',
    location: 'Ontario, NY',

    backgroundColor: jobBackgroundColors[2],
    jobListId: 1,
  },
  {
    id: 4,
    title: 'Solutions Architect',
    company: 'Disney',
    location: 'Tampa, Fl',

    backgroundColor: jobBackgroundColors[3],
    jobListId: 1,
  },
  {
    id: 5,
    title: 'Pending Title',
    company: 'Amazon',
    location: 'Tampa, Fl',

    backgroundColor: jobBackgroundColors[4],
    jobListId: 2,
  },
  {
    id: 6,
    title: 'Janitor Senior',
    company: 'Walmart',
    location: 'Tampa, Fl',

    backgroundColor: jobBackgroundColors[5],
    jobListId: 2,
  },
  {
    id: 7,
    title: 'Staff Solution Eng.',
    company: 'Berry Nimble',
    location: 'Tampa, Fl',

    backgroundColor: jobBackgroundColors[6],
    jobListId: 2,
  },
  {
    id: 8,
    title: 'OFFer-Principal Software',
    company: 'Target',
    location: 'Raleigh, NC',

    backgroundColor: jobBackgroundColors[7],
    jobListId: 3,
  },
  {
    id: 9,
    title: 'Need-Backend Software Engineer',
    company: 'BB&T',
    location: 'Los Angeles, CA',

    backgroundColor: jobBackgroundColors[8],
    jobListId: 3,
  },
  {
    id: 9,
    title: 'FrontEnd Software Engineer',
    company: 'Bank of America',
    location: 'Ontario, NY',

    backgroundColor: jobBackgroundColors[9],
    jobListId: 3,
  },
  {
    id: 10,
    title: 'Solutions Architect',
    company: 'Jet',
    location: 'Tampa, Fl',

    backgroundColor: jobBackgroundColors[10],
    jobListId: 3,
  },
];
