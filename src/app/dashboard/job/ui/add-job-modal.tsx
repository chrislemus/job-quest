import { formValidator } from '@common/utils';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { CreateJobDto } from '@app/dashboard/job/dto';
import { useJobLists } from '@app/dashboard/job-list/hooks';
import { useCreateJob } from '@app/dashboard/job/hooks';
import cn from 'classnames';
import { enqueueToast } from '@app/dashboard/toast/toast.slice';
import { useAppDispatch } from '../../store';

type AddJobModalProps = {
  active: boolean;
  toggle: () => void;
  defaultJobListId?: number;
};

export function AddJobModal(props: AddJobModalProps) {
  const { active, toggle, defaultJobListId } = props;

  const formId = defaultJobListId ? `new-job-${defaultJobListId}` : 'new-job';
  const dispatch = useAppDispatch();

  const form = useForm<CreateJobDto>({
    resolver: formValidator(CreateJobDto),
    shouldUnregister: true,
    defaultValues: {
      jobList: {
        id: defaultJobListId,
      },
    },
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
    <div className={cn('modal', { 'modal-open': active })}>
      <form
        className="modal-box relative"
        id={formId}
        onSubmit={form.handleSubmit(async (job) => {
          await addJobMutation.mutateAsync(job, {
            onSuccess: () => {
              toggle();
              dispatch(
                enqueueToast({
                  message: 'Job successfully created! 🙌',
                  type: 'success',
                })
              );
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
            aria-invalid={!!errors.company?.message}
            className="input input-bordered w-full aria-invalid:input-error"
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
            aria-invalid={!!errors.title?.message}
            className="input input-bordered w-full aria-invalid:input-error"
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
              {...form.register('jobList.id')}
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
            {errors.jobList?.id?.message && (
              <label className="label">
                <span className="label-text-alt text-error">
                  {errors.jobList?.id?.message}
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
          <label className="btn btn-primary btn-ghost" onClick={() => toggle()}>
            Cancel
          </label>
        </div>
      </form>
    </div>
  );
}
