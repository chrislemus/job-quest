import { useAppDispatch } from '@/app/dashboard/store';
import { enqueueToast } from '@/app/dashboard/toast/toast.slice';
import { UpdateJobDto } from '@/app/dashboard/job/dto';
import { useUpdateJob } from './update-job.hook';

type jobListData = Pick<UpdateJobDto, 'jobListId' | 'jobRank'>;

export function useAssignJobList() {
  const editJobMutation = useUpdateJob();
  const dispatch = useAppDispatch();

  return (jobId: string, jobListData: jobListData) => {
    return editJobMutation
      .mutateAsync({
        jobId,
        data: jobListData,
      })
      .catch((_e: unknown) => {
        dispatch(
          enqueueToast({
            message: 'Failed to change job list',
            type: 'error',
          })
        );
      });
  };
}
