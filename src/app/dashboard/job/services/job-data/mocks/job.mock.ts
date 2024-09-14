import { jobListMocks } from '@/app/dashboard/job-list/services/job-list-data/mocks';
import { JobDto } from '../dto';

export const jobMocks: JobDto[] = [
  {
    id: '38',
    title: 'Software Engineer',
    company: 'WalMax',
    location: 'Raleigh, NC',
    url: 'chrislemus.io',
    salary: '10k',
    description: 'great place to work',
    color: '#e91e63',
    userId: '1',
    jobListRank: 'a',
    jobListId: jobListMocks[0].id,
  },
  {
    id: '51',
    title: 'Janitor',
    company: 'HomeShows',
    location: 'San Diego, CA',
    url: 'chrislemus.io',
    salary: '120k',
    color: '#cddc39',
    userId: '1',
    jobListRank: 'b',
    jobListId: jobListMocks[1].id,
  },
  {
    id: '53',
    title: 'QA',
    company: 'WalBlue',
    color: '#009688',
    userId: '1',
    jobListRank: 'c',
    jobListId: jobListMocks[2].id,
  },
  {
    id: '57',
    title: 'Supervisor',
    company: 'SmartPet',
    color: '#03a9f4',
    userId: '1',
    jobListRank: 'd',
    jobListId: jobListMocks[3].id,
  },
];
