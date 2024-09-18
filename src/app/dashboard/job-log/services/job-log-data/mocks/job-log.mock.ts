import { JobLogItemDto } from '@/app/dashboard/job-log/services/job-log-data/dto/job-log.dto';
import { jobMocks } from '@/app/dashboard/job/services/job-data/mocks';

export const jobLogMocks: JobLogItemDto[] = [
  {
    id: '1',
    content: 'first interview went well',
    jobId: jobMocks[0].id,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: '2',
    content: 'find company values in website',
    jobId: jobMocks[2].id,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: '3',
    content: 'follow up in two days',
    jobId: jobMocks[3].id,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: '4',
    content: 'interview in two days',
    jobId: jobMocks[2].id,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
];
