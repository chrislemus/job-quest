type JobList = {
  id: number;
  label: string;
};

export const jobList: JobList[] = [
  { id: 1, label: 'Queue' },
  { id: 2, label: 'Applied' },
  { id: 3, label: 'Offer' },
];

export type Job = {
  id: number;
  title: string;
  location: string;
  jobListId: JobList['id'];
};

export const jobs: Job[] = [
  { id: 1, title: 'Principal Software', location: 'Raleigh, NC', jobListId: 1 },
  {
    id: 2,
    title: 'Backend Software Engineer',
    location: 'Los Angeles, CA',
    jobListId: 1,
  },
  {
    id: 3,
    title: 'FrontEnd Software Engineer',
    location: 'Ontario, NY',
    jobListId: 1,
  },
  { id: 4, title: 'Solutions Architect', location: 'Tampa, Fl', jobListId: 1 },
  { id: 5, title: 'Pending Title', location: 'Tampa, Fl', jobListId: 2 },
  { id: 6, title: 'Janitor Senior', location: 'Tampa, Fl', jobListId: 2 },
  { id: 7, title: 'Staff Solution Eng.', location: 'Tampa, Fl', jobListId: 2 },
  {
    id: 8,
    title: 'OFFer-Principal Software',
    location: 'Raleigh, NC',
    jobListId: 3,
  },
  {
    id: 9,
    title: 'Need-Backend Software Engineer',
    location: 'Los Angeles, CA',
    jobListId: 3,
  },
  {
    id: 9,
    title: 'FrontEnd Software Engineer',
    location: 'Ontario, NY',
    jobListId: 3,
  },
  { id: 10, title: 'Solutions Architect', location: 'Tampa, Fl', jobListId: 3 },
];
