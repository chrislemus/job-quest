import { JobLogItemDto } from '@/app/dashboard/job-log/services/job-log-data/dto/job-log.dto';
import { jobMocks } from '@/app/dashboard/job/services/job-data/mocks';

export const jobLogMocks: JobLogItemDto[] = [
  {
    id: '1',
    content: 'first interview went well',
    jobId: jobMocks[0].id,
    createdAt: new Date(2022, 0, 2).toISOString().split('T')[0],
    updatedAt: new Date(2022, 0, 4).toISOString().split('T')[0],
  },
  {
    id: '2',
    content: 'find company values in website',
    jobId: jobMocks[2].id,
    createdAt: new Date(2022, 0, 3).toISOString().split('T')[0],
    updatedAt: new Date(2022, 1, 4).toISOString().split('T')[0],
  },
  {
    id: '3',
    content: 'follow up in two days',
    jobId: jobMocks[3].id,
    createdAt: new Date(2022, 2, 2).toISOString().split('T')[0],
    updatedAt: new Date(2022, 3, 4).toISOString().split('T')[0],
  },
  {
    id: '4',
    content: 'interview in two days',
    jobId: jobMocks[2].id,
    createdAt: new Date(2022, 0, 1).toISOString().split('T')[0],
    updatedAt: new Date(2022, 0, 2).toISOString().split('T')[0],
  },
];
