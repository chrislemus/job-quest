import { JobListEntity } from './job-list.entity';

export class JobEntity {
  id: number;
  title: string;
  company: string;
  location: string | null;
  salary: number | null;
  description: string | null;
  backgroundColor: string;
  jobListId: JobListEntity['id'];
}
