import { formValidator } from '@common/utils';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { CreateJobDto } from '@app/dashboard/job/dto';
import { useJobLists } from '@app/dashboard/job-list/hooks';
import { useCreateJob } from '@app/dashboard/job/hooks';
import cn from 'classnames';
import { useModal } from '@/common/hooks';

export const MODAL_ID = 'addJob';

type NewJobModalContentProps = {
  modalId: string;
};

export function AddJobModal(p: NewJobModalContentProps) {
  const formId = 'new-job';
  const modal = useModal(MODAL_ID);

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

  return (
    <div className={cn('modal', { 'modal-open': modal.isOpen })}>
      <form
        className="modal-box relative"
        id={formId}
        onSubmit={form.handleSubmit(async (job) => {
          await addJobMutation.mutateAsync(job, {
            onSuccess: () => {
              modal.toggle();
            },
          });
        })}
      >
        <h2 className="text-xl font-semibold">Add a Job</h2>
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
            data-testid="input-company"
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
            data-testid="input-title"
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
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">List</span>
            </label>
            <select
              className="select select-bordered"
              data-testid="input-job-list"
              placeholder="Please select"
              {...form.register('jobListId')}
            >
              {jobListOptions.map((opt) => {
                const { label, value } = opt;
                return (
                  <option key={value} value={value}>
                    {label}
                  </option>
                );
              })}
            </select>
            {errors.jobListId?.message && (
              <label className="label">
                <span className="label-text-alt text-error">
                  {errors.jobListId.message}
                </span>
              </label>
            )}
          </div>
        )}

        <div className="modal-actions pt-8 flex justify-end gap-4">
          <button
            className={'btn btn-primary disabled:loading'}
            type="submit"
            form={formId}
            disabled={form.formState.isSubmitting}
          >
            Add
          </button>
          <label
            className="btn btn-primary btn-ghost"
            htmlFor={MODAL_ID}
            onClick={() => modal.toggle()}
          >
            Cancel
          </label>
        </div>
      </form>
    </div>
  );
}
