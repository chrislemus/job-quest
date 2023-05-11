import { useAppDispatch } from '@/app/dashboard/store';
import { enqueueToast } from '@/app/dashboard/toast/toast.slice';
import { JobListDto } from '@/app/dashboard/job/dto';
import { useUpdateJob } from './update-job.hook';

export function useAssignJobList() {
  const editJobMutation = useUpdateJob();
  const dispatch = useAppDispatch();

  return (jobId: number, jobListData: JobListDto) =>
    editJobMutation
      .mutateAsync({
        jobId,
        data: { jobList: jobListData },
      })
      .catch((_e: unknown) => {
        dispatch(
          enqueueToast({
            message: 'Failed to change job list',
            type: 'error',
          })
        );
      });
}
