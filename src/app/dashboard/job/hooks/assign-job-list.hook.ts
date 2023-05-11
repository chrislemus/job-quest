import { useAppDispatch } from '../../store';
import { enqueueToast } from '../../toast/toast.slice';
import { JobListDto } from '../dto';
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
