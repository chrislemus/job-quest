import { JobListEntity } from './job-list.entity';

export class JobEntity {
  id: number;
  title: string;
  location: string;
  jobListId: JobListEntity['id'];
}
