import { useMutation } from '@tanstack/react-query';
import { jobService } from '@app/dashboard/job/_services';
import { queryClient } from '@common/query-client';
import { jobQueryKeyFactory } from '../_factories';

export function useCreateJob() {
  const mutation = useMutation({
    mutationFn: jobService.createJob,
    onSuccess(res) {
      queryClient.invalidateQueries({
        queryKey: jobQueryKeyFactory.detail(res.data.id),
      });
      queryClient.invalidateQueries({
        queryKey: jobQueryKeyFactory.all({ jobListId: res.data.jobListId }),
      });
    },
  });
  return mutation;
}
