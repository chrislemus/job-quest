import { JobListEntity } from './job-list.entity';

export class JobEntity {
  id: number;
  title: string;
  company: string;
  location?: string;
  url?: string;
  salary?: string;
  description?: string;
  backgroundColor: string;
  jobListId: JobListEntity['id'];
}
