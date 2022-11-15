import { JobListEntity } from './job-list.entity';

export class JobEntity {
  id: number;
  title: string;
  company: string;
  location?: string;
  url?: string;
  salary?: number;
  description?: string;
  backgroundColor: string;
  jobListId: JobListEntity['id'];
}
