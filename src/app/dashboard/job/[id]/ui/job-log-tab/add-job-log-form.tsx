import { useForm } from 'react-hook-form';
import { formValidator } from '@common/utils';
import { CreateJobLogDto } from '@app/dashboard/job/dto';
import { useCreateJobLog } from '@app/dashboard/job-log/hooks';
import { ChevronUpIcon } from '@heroicons/react/20/solid';
import { useMemo } from 'react';

type AddJobLogFormProps = {
  jobId: number;
};

export function AddJobLogForm(p: AddJobLogFormProps) {
  const form = useForm<CreateJobLogDto>({
    defaultValues: { jobId: p.jobId },
    resolver: formValidator(CreateJobLogDto),
  });

  const content = form.watch('content');
  const createJobLogMutation = useCreateJobLog();

  const formErrors = createJobLogMutation.error?.messages;
  const contentFieldError = form.formState.errors.content?.message;
  const errors = useMemo(() => {
    let errors: string[] = [];
    if (contentFieldError) errors.push(contentFieldError);
    if (formErrors) errors = [...errors, ...formErrors];
    if (errors.length > 0) return errors.join(', ');
  }, [contentFieldError, formErrors]);

  return (
    <form
      className="flex flex-col"
      onSubmit={form.handleSubmit(async (data) => {
        await createJobLogMutation.mutateAsync(data, {
          onSuccess: () => {
            form.reset();
          },
        });
      })}
    >
      <div className="form-control w-full">
        <textarea
          data-testid="input-content"
          placeholder="content..."
          aria-invalid={!!contentFieldError}
          className="textarea textarea-bordered h-16 aria-invalid:textarea-error"
          {...form.register('content')}
        />
        {errors && (
          <label className="label">
            <span className="label-text-alt text-error">{errors}</span>
          </label>
        )}
      </div>

      <div className="flex justify-end pt-2">
        <button
          disabled={!(content?.length > 0)}
          type="submit"
          className="btn btn-circle btn-primary btn-xs"
        >
          <ChevronUpIcon />
        </button>
      </div>
    </form>
  );
}
