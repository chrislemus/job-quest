import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { CreateJobDto } from '@app/dashboard/job/_dto';
import { jobService } from '@app/dashboard/job/_services';
import { ApiOkRes } from '@common/api/job-quest/interface';
import { JobEntity } from '../_entities';
import { ApiError } from 'next/dist/server/api-utils';

function useCreateJob() {
  const options: UseMutationOptions<
    ApiOkRes<JobEntity>,
    ApiError,
    CreateJobDto
  > = {
    mutationFn: (job: CreateJobDto) => {
      return jobService.createJob(job);
    },
  };

  const mutation = useMutation(options);
  return mutation;
}

export { useCreateJob };
export * from './update-job.hook';
