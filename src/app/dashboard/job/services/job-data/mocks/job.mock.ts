import { jobListMocks } from '@/app/dashboard/job-list/services/job-list-data/mocks';
import { JobDto } from '../dto';
import { userProfileMock } from '@/app/user/services/user-data/mocks';

export const jobMocks: JobDto[] = [
  {
    id: '770612cb-29d9-4bce-b535-467e36d84e47',
    title: 'Software Engineer',
    company: 'WalMax',
    location: 'Raleigh, NC',
    url: 'chrislemus.io',
    salary: '10k',
    description: 'great place to work',
    color: '#e91e63',
    userId: userProfileMock.id,
    jobRank: 'a',
    jobListId: jobListMocks[0].id,
  },
  {
    id: '48df3028-b02a-4d7c-bb27-8f0b9eb7dbed',
    title: 'Janitor',
    company: 'HomeShows',
    location: 'San Diego, CA',
    url: 'chrislemus.io',
    salary: '120k',
    color: '#cddc39',
    userId: userProfileMock.id,
    jobRank: 'b',
    jobListId: jobListMocks[1].id,
  },
  {
    id: '0c21478c-84af-4488-ac1b-5e6ecf1aa6e0',
    title: 'QA',
    company: 'WalBlue',
    color: '#009688',
    userId: userProfileMock.id,
    jobRank: 'c',
    jobListId: jobListMocks[2].id,
  },
  {
    id: 'ff7c2f87-a134-4d16-9628-befbbb945375',
    title: 'Supervisor',
    company: 'SmartPet',
    color: '#03a9f4',
    userId: userProfileMock.id,
    jobRank: 'd',
    jobListId: jobListMocks[3].id,
  },
];
