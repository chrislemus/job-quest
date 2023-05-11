import { JobLogEntity } from '@/api/job-quest/job-log/job-log.entity';
import { jobMocks } from '@/api/job-quest/job/job.mocks';

export const jobLogMocks: JobLogEntity[] = [
  {
    id: 1,
    content: 'first interview went well',
    jobId: jobMocks[0].id,
    createdAt: new Date(2022, 0, 2),
    updatedAt: new Date(2022, 0, 4),
  },
  {
    id: 2,
    content: 'find company values in website',
    jobId: jobMocks[2].id,
    createdAt: new Date(2022, 0, 3),
    updatedAt: new Date(2022, 1, 4),
  },
  {
    id: 3,
    content: 'follow up in two days',
    jobId: jobMocks[3].id,
    createdAt: new Date(2022, 2, 2),
    updatedAt: new Date(2022, 3, 4),
  },
  {
    id: 4,
    content: 'interview in two days',
    jobId: jobMocks[2].id,
    createdAt: new Date(2022, 0, 1),
    updatedAt: new Date(2022, 0, 2),
  },
];
