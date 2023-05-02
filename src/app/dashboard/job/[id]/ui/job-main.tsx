'use client';
import { formValidator } from '@common/utils';
import { jobColors } from '@app/dashboard/job/constants';
import Link from 'next/link';
import { Fragment, useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { UpdateJobDto } from '@app/dashboard/job/dto';
import { useJobLists } from '@app/dashboard/job-list/hooks';
import { useUpdateJob } from '@app/dashboard/job/hooks';
import { JobEntity } from '@api/job-quest/job/job.entity';
import {
  CheckIcon,
  ArrowTopRightOnSquareIcon,
} from '@heroicons/react/20/solid';
import { DeleteJobButton } from './delete-job-button';
import cn from 'classnames';
import { Listbox } from '@headlessui/react';
import { useAppDispatch } from '@app/dashboard/store';
import { enqueueToast } from '@app/dashboard/toast/toast.slice';

type JobMainProps = {
  job: JobEntity;
};

const people = [
  { name: 'will', id: 1 },
  { name: 'smith', id: 2 },
  { name: 'mime', id: 3 },
];

export function JobMain(p: JobMainProps) {
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

  const shouldFormatJobUrl = (value: string) => {
    return !value.startsWith('http') && value?.length > 0;
  };

  const formMethods = useForm<UpdateJobDto>({
    resolver: formValidator(UpdateJobDto),
  });

  const fieldErrors = formMethods.formState.errors;

  const JobsListQuery = useJobLists();

  const jobListOptions = useMemo(() => {
    return JobsListQuery.data?.data?.map((j) => ({
      value: j.id,
      label: j.label,
    }));
  }, [JobsListQuery.data]);

  const [successCount, setSuccessCount] = useState(0);

  useEffect(() => {
    if (successCount > 0) {
      const timeOut = setTimeout(() => {
        setSuccessCount((count) => count - 1);
      }, 1000);
      return () => {
        clearTimeout(timeOut);
      };
    }
  }, [successCount]);

  const errorMsgs = editJobMutation.error?.messages;
  const jobUrl = formMethods.watch('url');

  return (
    <form
      onSubmit={formMethods.handleSubmit(async (data) => {
        await editJobMutation.mutateAsync({ jobId: p.job.id, data });
        displaySuccessToast();
      })}
    >
      <div className="grid grid-cols-1 gap-4">
        <div>
          {errorMsgs && (
            <ul className="text-error list-disc list-inside">
              {errorMsgs.map((msg) => {
                return <li>{msg}</li>;
              })}
            </ul>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Title</span>
            </label>
            <input
              type="text"
              data-testid="input-title"
              defaultValue={p.job?.title}
              className={cn('input input-bordered w-full', {
                'input-error': !!fieldErrors.title?.message,
              })}
              {...formMethods.register('title')}
            />
            {fieldErrors.title?.message && (
              <label className="label">
                <span className="label-text-alt text-error">
                  {fieldErrors.title.message}
                </span>
              </label>
            )}
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Company</span>
            </label>
            <input
              type="text"
              data-testid="input-company"
              defaultValue={p.job?.company}
              className={cn('input input-bordered w-full', {
                'input-error': !!fieldErrors.company?.message,
              })}
              {...formMethods.register('company')}
            />
            {fieldErrors.company?.message && (
              <label className="label">
                <span className="label-text-alt text-error">
                  {fieldErrors.company.message}
                </span>
              </label>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {jobListOptions && (
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">List</span>
              </label>
              <select
                className="select select-bordered"
                defaultValue={p.job?.jobListId}
                data-testid="input-job-list"
                placeholder="Please select"
                {...formMethods.register('jobListId')}
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
              {fieldErrors.jobListId?.message && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {fieldErrors.jobListId.message}
                  </span>
                </label>
              )}
            </div>
          )}

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Color</span>
            </label>

            <Controller
              control={formMethods.control}
              name="color"
              render={({ field: { onChange, onBlur, value, name, ref } }) => (
                <Listbox
                  as="div"
                  name={name}
                  defaultValue={p.job?.color || undefined}
                  onBlur={onBlur}
                  onChange={onChange}
                  ref={ref}
                  className="relative"
                >
                  <Listbox.Button as={Fragment}>
                    {({ value }) => (
                      <div className="select " style={{ background: value }} />
                    )}
                  </Listbox.Button>

                  <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-32 overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
                    {jobColors.map((color) => (
                      <Listbox.Option
                        key={color}
                        className="flex justify-center items-center h-8 hover:bg-slate-100 hover:cursor-pointer"
                        value={color}
                      >
                        {({ selected }) => (
                          <div
                            className="relative w-5/6 h-4/6"
                            style={{ background: color }}
                          >
                            {selected && (
                              <span className="absolute inset-y-0 left-0 flex items-center pr-4 text-base-100">
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            )}
                          </div>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Listbox>
              )}
            />

            {fieldErrors.color?.message && (
              <label className="label">
                <span className="label-text-alt text-error">
                  {fieldErrors.color.message}
                </span>
              </label>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Job Url</span>
            </label>
            <div className="relative">
              <input
                type="text"
                data-testid="input-url"
                defaultValue={p.job?.url || undefined}
                className={cn('input input-bordered w-full', {
                  'input-error': !!fieldErrors.url?.message,
                })}
                {...formMethods.register('url', {
                  setValueAs(value) {
                    if (value?.trim()?.length === 0) return '';
                    if (shouldFormatJobUrl(value)) return `https://${value}`;
                    return value;
                  },
                  onBlur: (e) => {
                    const displayedValue = e.target?.value;
                    const registeredValue = formMethods.getValues('url');
                    if (displayedValue !== registeredValue) {
                      e.target.value = registeredValue;
                    }
                  },
                })}
              />
              {jobUrl && (
                <Link
                  href={jobUrl}
                  target="_blank"
                  className="absolute inset-y-0 right-0 he flex items-center pr-3 hover:opacity-50"
                >
                  <ArrowTopRightOnSquareIcon
                    className=" h-2/3 text-gray-400"
                    aria-hidden="true"
                  />
                </Link>
              )}
            </div>
            {fieldErrors.url?.message && (
              <label className="label">
                <span className="label-text-alt text-error">
                  {fieldErrors.url.message}
                </span>
              </label>
            )}
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Location</span>
            </label>
            <input
              type="text"
              data-testid="input-location"
              defaultValue={p.job?.location || undefined}
              className={cn('input input-bordered w-full', {
                'input-error': !!fieldErrors.location?.message,
              })}
              {...formMethods.register('location')}
            />
            {fieldErrors.location?.message && (
              <label className="label">
                <span className="label-text-alt text-error">
                  {fieldErrors.location.message}
                </span>
              </label>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Salary</span>
            </label>
            <input
              type="text"
              data-testid="input-salary"
              defaultValue={p.job?.salary || undefined}
              className={cn('input input-bordered w-full', {
                'input-error': !!fieldErrors.salary?.message,
              })}
              {...formMethods.register('salary')}
            />
            {fieldErrors.salary?.message && (
              <label className="label">
                <span className="label-text-alt text-error">
                  {fieldErrors.salary.message}
                </span>
              </label>
            )}
          </div>
        </div>
        <div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <textarea
              data-testid="input-description"
              defaultValue={p.job?.description || undefined}
              className={cn('textarea textarea-bordered h-32', {
                'textarea-error': !!fieldErrors.description?.message,
              })}
              {...formMethods.register('description')}
            />
            {fieldErrors.description?.message && (
              <label className="label">
                <span className="label-text-alt text-error">
                  {fieldErrors.description.message}
                </span>
              </label>
            )}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-10 pt-5">
          <button
            type="submit"
            className={cn('btn btn-primary', {
              loading: formMethods.formState.isSubmitting,
            })}
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
