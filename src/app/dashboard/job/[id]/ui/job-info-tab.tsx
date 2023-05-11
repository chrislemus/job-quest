'use client';
import { formValidator } from '@/common/utils';
import { jobColors } from '@/app/dashboard/job/constants';
import Link from 'next/link';
import { Controller, useForm } from 'react-hook-form';
import { UpdateJobDto } from '@/app/dashboard/job/dto';
import { useJobLists } from '@/app/dashboard/job-list/hooks';
import { useUpdateJob } from '@/app/dashboard/job/hooks';
import { JobEntity } from '@/api/job-quest/job/job.entity';
import { DeleteJobButton } from './delete-job-button';
import { Listbox } from '@headlessui/react';
import { useAppDispatch } from '@/app/dashboard/store';
import { enqueueToast } from '@/app/dashboard/toast/toast.slice';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { PropsWithChildren, useMemo } from 'react';

type JobInfoTabProps = {
  job: JobEntity;
};

export type TextFieldProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'className' | 'type'
> & { invalid?: boolean; id: string };

const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  ({ invalid, ...props }, ref) => {
    return (
      <input
        type="text"
        data-testid={props.id}
        aria-invalid={invalid}
        className="input input-bordered w-full aria-invalid:input-error"
        ref={ref}
        {...props}
      />
    );
  }
);
TextField.displayName = 'TextField';

export function JobInfoTab(p: JobInfoTabProps) {
  const dispatch = useAppDispatch();
  const displaySuccessToast = () => {
    dispatch(
      enqueueToast({
        message: 'Job updated',
        type: 'success',
      })
    );
  };

  const editJobMutation = useUpdateJob();

  const formMethods = useForm<UpdateJobDto>({
    resolver: formValidator(UpdateJobDto),
    defaultValues: {
      title: p.job.title,
      company: p.job.company,
      jobList: { id: p.job.jobListId },
      color: p.job.color || undefined,
      url: p.job.url || undefined,
      location: p.job.location || undefined,
      salary: p.job.salary || undefined,
      description: p.job.description || undefined,
    },
  });

  const fieldErrors = formMethods.formState.errors;

  const JobsListQuery = useJobLists();

  const jobListOptions = useMemo(() => {
    return JobsListQuery.data?.data?.map((j) => ({
      value: j.id,
      label: j.label,
    }));
  }, [JobsListQuery.data]);

  const errorMsgs = editJobMutation.error?.messages;
  const jobUrl = formMethods.watch('url');

  return (
    <form
      onSubmit={formMethods.handleSubmit(async (data) => {
        await editJobMutation.mutateAsync({ jobId: p.job.id, data });
        displaySuccessToast();
      })}
    >
      <div className="grid grid-cols-1 gap-4 ">
        <div>
          {errorMsgs && (
            <ul className="text-error list-disc list-inside">
              {errorMsgs.map((msg) => (
                <li>{msg}</li>
              ))}
            </ul>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="form-control">
            <FieldLabel htmlFor="job-title">Title</FieldLabel>
            <TextField
              id="job-title"
              invalid={!!fieldErrors.title?.message}
              {...formMethods.register('title')}
            />
            <FieldError error={fieldErrors?.title?.message} />
          </div>
          <div className="form-control w-full">
            <FieldLabel htmlFor="job-company">Company</FieldLabel>
            <TextField
              id="job-company"
              invalid={!!fieldErrors.company?.message}
              {...formMethods.register('company')}
            />
            <FieldError error={fieldErrors?.company?.message} />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {jobListOptions && (
            <div className="form-control w-full">
              <FieldLabel htmlFor="job-list">List</FieldLabel>
              <select
                className="select select-bordered"
                id="job-list"
                data-testid="input-job-list"
                placeholder="Please select"
                {...formMethods.register('jobList.id')}
              >
                {jobListOptions.map(({ label, value }) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
              <FieldError error={fieldErrors?.jobList?.id?.message} />
            </div>
          )}

          <div className="form-control w-full">
            <FieldLabel htmlFor="job-color">Color</FieldLabel>
            <Controller
              control={formMethods.control}
              name="color"
              render={({ field: { ...fieldProps } }) => (
                <Listbox
                  as="div"
                  id="job-color"
                  className="relative"
                  {...fieldProps}
                >
                  <Listbox.Button
                    className="h-12 w-16 rounded-lg"
                    style={{ background: fieldProps.value }}
                  />

                  <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-32 overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
                    {jobColors.map((color) => {
                      return (
                        <Listbox.Option
                          key={color}
                          className="flex justify-center items-center h-8 aria-disabled:opacity-25 hover:bg-slate-100 hover:cursor-pointer"
                          disabled={color === fieldProps.value}
                          value={color}
                        >
                          <div
                            className="w-5/6 h-4/6"
                            style={{ background: color }}
                          />
                        </Listbox.Option>
                      );
                    })}
                  </Listbox.Options>
                </Listbox>
              )}
            />

            <FieldError error={fieldErrors?.color?.message} />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="form-control w-full">
            <FieldLabel htmlFor="job-url">Job Url</FieldLabel>
            <div className="relative">
              <Controller
                control={formMethods.control}
                name="url"
                render={({
                  field: { name, onBlur, onChange, value, ref },
                  formState: { errors },
                }) => {
                  return (
                    <TextField
                      id="job-url"
                      invalid={!!errors.url?.message}
                      name={name}
                      ref={ref}
                      value={value}
                      onChange={(e) => {
                        let value = e.target.value ?? '';
                        onChange(value.trim());
                      }}
                      onBlur={(e) => {
                        let value = e.target.value ?? '';
                        const empty = value.length === 0;
                        const emptyAlt = /^(http|https):\/\/$/.test(value);
                        const validPrefix = /^(http|https):\/\//.test(value);

                        if (!validPrefix && !empty) {
                          onChange(`https://${value}`);
                        } else if (emptyAlt) {
                          onChange('');
                        }
                        onBlur();
                      }}
                    />
                  );
                }}
              />
              {jobUrl && (
                <Link
                  href={jobUrl}
                  target="_blank"
                  className="absolute inset-y-0 right-0 he flex items-center pr-3 hover:opacity-50"
                >
                  <FontAwesomeIcon
                    className="h-2/5 text-gray-400"
                    icon={faArrowUpRightFromSquare}
                  />
                </Link>
              )}
            </div>
            <FieldError error={fieldErrors?.url?.message} />
          </div>
          <div className="form-control w-full">
            <FieldLabel htmlFor="job-location">Location</FieldLabel>
            <TextField
              id="job-location"
              invalid={!!fieldErrors.location?.message}
              {...formMethods.register('location')}
            />
            <FieldError error={fieldErrors?.location?.message} />
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div className="form-control w-full">
            <FieldLabel htmlFor="job-salary">Salary</FieldLabel>
            <TextField
              id="job-salary"
              invalid={!!fieldErrors.salary?.message}
              {...formMethods.register('salary')}
            />

            <FieldError error={fieldErrors?.salary?.message} />
          </div>
        </div>
        <div>
          <div className="form-control w-full">
            <FieldLabel htmlFor="job-description">Description</FieldLabel>
            <textarea
              data-testid="input-description"
              id="job-description"
              aria-invalid={!!fieldErrors.description?.message}
              className="textarea textarea-bordered h-32 aria-invalid:textarea-error"
              {...formMethods.register('description')}
            />
            <FieldError error={fieldErrors?.description?.message} />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-10 pt-5">
          <button
            type="submit"
            className="btn btn-primary disabled:loading"
            disabled={formMethods.formState.isSubmitting}
          >
            Save
          </button>
          <DeleteJobButton jobId={p.job.id} />
        </div>
      </div>
    </form>
  );
}

function FieldLabel(p: PropsWithChildren<{ htmlFor: string }>) {
  const { htmlFor } = p;
  return (
    <label className="label" htmlFor={htmlFor}>
      <span className="label-text">{p.children}</span>
    </label>
  );
}

function FieldError(p: { error: string | undefined }) {
  const { error } = p;
  if (!error) return <></>;
  return (
    <label className="label">
      <span className="label-text-alt text-error">{error}</span>
    </label>
  );
}
