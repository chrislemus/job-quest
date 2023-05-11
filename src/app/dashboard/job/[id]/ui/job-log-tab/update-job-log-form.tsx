import { UpdateJobLogDto } from '@/app/dashboard/job/dto';
import { JobLogEntity } from '@/api/job-quest/job-log/job-log.entity';
import { useForm } from 'react-hook-form';
import { formValidator } from '@/common/utils';
import { useUpdateJobLog } from '@/app/dashboard/job-log/hooks';
import { useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faXmark } from '@fortawesome/free-solid-svg-icons';

export type UpdateJobLogFormProps = {
  jobLog: JobLogEntity;
  disableForm: () => void;
};

export function UpdateJobLogForm(p: UpdateJobLogFormProps) {
  const form = useForm<UpdateJobLogDto>({
    resolver: formValidator(UpdateJobLogDto),
    defaultValues: { content: p.jobLog.content },
  });

  const content = form.watch('content');
  const updateJobLogMutation = useUpdateJobLog();

  const formErrors = updateJobLogMutation.error?.messages;
  const contentFieldError = form.formState.errors.content?.message;
  const errors = useMemo(() => {
    let errors: string[] = [];
    if (contentFieldError) errors.push(contentFieldError);
    if (formErrors) errors = [...errors, ...formErrors];
    if (errors.length > 0) return errors.join(', ');
  }, [contentFieldError, formErrors]);

  return (
    <form
      onSubmit={form.handleSubmit(async (data) => {
        await updateJobLogMutation.mutateAsync(
          { jobLogId: p.jobLog.id, data },
          {
            onSuccess: () => {
              p.disableForm();
            },
          }
        );
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
      <div className="flex justify-end pt-2 gap-4">
        <div>
          <button
            type="button"
            className="btn btn-circle btn-xs btn-error"
            onClick={p.disableForm}
          >
            <FontAwesomeIcon icon={faXmark} className="h-4" />
          </button>
        </div>
        <div>
          <button
            disabled={!(content?.length > 0)}
            type="submit"
            className="btn btn-circle btn-primary btn-xs"
          >
            <FontAwesomeIcon icon={faChevronUp} />
          </button>
        </div>
      </div>
    </form>
  );
}
