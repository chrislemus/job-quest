import { JobLogItemDto } from '@/app/dashboard/job-log/services/job-log-data/dto/job-log.dto';
import { jobMocks } from '@/app/dashboard/job/services/job-data/mocks';

export const jobLogMocks: JobLogItemDto[] = [
  {
    id: 'c82d6789-7cdb-44c9-a88e-8e28fc0fdb59',
    content: 'first interview went well',
    jobId: jobMocks[0].id,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: '835a53d2-af26-49c5-a317-3589c2007c00',
    content: 'find company values in website',
    jobId: jobMocks[2].id,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: 'b03a5aab-fabd-454a-ae43-c509e3937293',
    content: 'follow up in two days',
    jobId: jobMocks[3].id,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: '81828516-8833-40fb-8d7d-608bb8916185',
    content: 'interview in two days',
    jobId: jobMocks[2].id,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
];
