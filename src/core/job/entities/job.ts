import { JobListEntity } from './job-list.entity';

export class JobEntity {
  id: number;
  title: string;
  company: string;
  location: string;
  jobListId: JobListEntity['id'];
}
