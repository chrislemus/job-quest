import { formValidator } from '@common/utils';
import { useMemo, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { CreateJobDto } from '@app/dashboard/job/dto';
import { useJobLists } from '@app/dashboard/job-list/hooks';
import { useCreateJob } from '@app/dashboard/job/hooks';
import { useClickAway } from 'react-use';
import cn from 'classnames';

type NewJobModalContentProps = {
  active: boolean;
  toggleActive: () => void;
};

export function AddJobModal(p: NewJobModalContentProps) {
  const modalRef = useRef(null);
  useClickAway(modalRef, () => {
    p.toggleActive();
  });
  const formId = 'new-job';
  const form = useForm<CreateJobDto>({
    resolver: formValidator(CreateJobDto),
    shouldUnregister: true,
  });

  const JobsListQuery = useJobLists();
  const addJobMutation = useCreateJob();

  const jobListOptions = useMemo(() => {
    const data = JobsListQuery.data?.data?.map((j) => ({
      value: j.id,
      label: j.label,
    }));
    return data;
  }, [JobsListQuery.data]);

  const errors = form.formState.errors;
  const errorMsgs = addJobMutation.error?.messages;

  if (!p.active) return <></>;

  return (
    <div className="toast toast-center toast-middle z-10" ref={modalRef}>
      <div className="card w-96 bg-base-100 shadow-xl">
        <form
          id={formId}
          onSubmit={form.handleSubmit((job) => {
            addJobMutation.mutate(job, {
              onSuccess: () => {
                form.reset();
                p.toggleActive();
              },
            });
          })}
        >
          <div className="card-body gap-2">
            <h2 className="card-title">Add a Job</h2>
            <p> Quickly add job by entering formation below.</p>

            {errorMsgs && (
              <ul className="text-error list-disc list-inside">
                {errorMsgs.map((msg) => {
                  return <li>{msg}</li>;
                })}
              </ul>
            )}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Company</span>
              </label>
              <input
                type="text"
                className={cn('input input-bordered w-full', {
                  'input-error': !!form.formState.errors?.company?.message,
                })}
                {...form.register('company')}
              />
              {errors.company?.message && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errors.company.message}
                  </span>
                </label>
              )}
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Title</span>
              </label>
              <input
                type="text"
                className={cn('input input-bordered w-full', {
                  'input-error': !!form.formState.errors?.title?.message,
                })}
                {...form.register('title')}
              />
              {errors.title?.message && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errors.title.message}
                  </span>
                </label>
              )}
            </div>
            {jobListOptions && (
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">List</span>
                </label>
                <select
                  className="select select-bordered"
                  placeholder="Please select"
                  {...form.register('jobListId')}
                >
                  {jobListOptions.map((opt) => {
                    return (
                      <option key={opt.value} selected>
                        {opt.label}
                      </option>
                    );
                  })}
                </select>
              </div>
            )}

            <div className="card-actions justify-end pt-3">
              <button
                className={cn('btn btn-primary', {
                  loading:
                    form.formState.isSubmitting || addJobMutation.isLoading,
                })}
                type="submit"
                form={formId}
                disabled={
                  form.formState.isSubmitting || addJobMutation.isLoading
                }
              >
                Add
              </button>
              <button
                className="btn btn-primary btn-ghost"
                type="button"
                onClick={p.toggleActive}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
