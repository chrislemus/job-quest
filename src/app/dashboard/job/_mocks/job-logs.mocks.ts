import { JobLogEntity } from '../_entities';

export const jobLogs: JobLogEntity[] = [
  {
    id: 1,
    content: 'first interview went well',
    jobId: 1,
    createdAt: new Date(2022, 0, 2),
    updatedAt: new Date(2022, 0, 4),
  },
  {
    id: 2,
    content: 'find company values in website',
    jobId: 1,
    createdAt: new Date(2022, 0, 3),
    updatedAt: new Date(2022, 1, 4),
  },
  {
    id: 3,
    content: 'follow up in two days',
    jobId: 1,
    createdAt: new Date(2022, 2, 2),
    updatedAt: new Date(2022, 3, 4),
  },
  {
    id: 4,
    content: 'interview in two days',
    jobId: 2,
    createdAt: new Date(2022, 0, 1),
    updatedAt: new Date(2022, 0, 2),
  },
];
