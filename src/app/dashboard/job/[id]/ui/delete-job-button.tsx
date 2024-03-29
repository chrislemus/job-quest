'use client';
import { useRouter } from 'next/navigation';
import { useDeleteJob } from '@/app/dashboard/job/hooks';
import { useId } from 'react';
import { useAppDispatch } from '@/app/dashboard/store';
import { enqueueToast } from '@/app/dashboard/toast/toast.slice';

type DeleteJobButtonProps = {
  jobId: number;
};

export function DeleteJobButton(p: DeleteJobButtonProps) {
  const dispatch = useAppDispatch();
  const modalId = useId();
  const router = useRouter();
  const deleteJobMutation = useDeleteJob();

  return (
    <>
      <label htmlFor={modalId} className="btn btn-error btn-outline">
        Delete
      </label>

      <input type="checkbox" id={modalId} className="modal-toggle" />
      <label htmlFor={modalId} className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor={modalId}>
          <label
            htmlFor={modalId}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </label>

          <h3 className="text-lg font-bold">Delete Job</h3>
          <p className="py-4">Are you sure you want to delete this Job?</p>
          <div className="flex gap-4 pt-6">
            <button
              disabled={deleteJobMutation.isLoading}
              className="btn btn-error disabled:loading"
              type="button"
              onClick={() => {
                deleteJobMutation.mutate(p.jobId, {
                  onSuccess: () => {
                    router.back();
                    dispatch(
                      enqueueToast({
                        message: 'Job successfully deleted',
                        type: 'success',
                      })
                    );
                  },
                  onError() {
                    dispatch(
                      enqueueToast({
                        message: 'Failed to change delete job',
                        type: 'error',
                      })
                    );
                  },
                });
              }}
            >
              Delete
            </button>
            <label className="btn btn-outline" htmlFor={modalId}>
              Cancel
            </label>
          </div>
        </label>
      </label>
    </>
  );
}
