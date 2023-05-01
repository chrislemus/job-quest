import { useActiveJobList, useJobLists } from '@app/dashboard/job-list/hooks';
import cn from 'classnames';

export function JobListTabs() {
  const [activeJobList, setActiveJobList] = useActiveJobList();
  const jobsListQuery = useJobLists();
  const jobLists = jobsListQuery.data?.data || [];

  if (jobsListQuery.isLoading)
    return <div className="h-14 w-full bg-gray-300 animate-pulse rounded" />;

  const noData = !jobLists || !activeJobList;
  if (jobsListQuery.isError || noData) return <JobListTabsError />;

  return (
    <div>
      {/* MOBILE */}
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select job list
        </label>
        <select
          id="tabs"
          name="tabs"
          className="block w-full rounded-md border-2 border-base-200 py-2 pl-3 pr-10 text-base sm:text-sm outline-none"
          onChange={(e) => {
            const value = +e.target?.value;
            setActiveJobList(value);
          }}
        >
          {jobLists.map(({ id, label }) => (
            <option key={id} value={id}>
              {label}
            </option>
          ))}
        </select>
      </div>
      {/* LG */}
      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {jobLists.map(({ id, label }) => (
              <a
                key={id}
                onClick={() => setActiveJobList(id)}
                className={cn(
                  activeJobList == id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                  'whitespace-nowrap border-b-2 py-2 px-1 text-sm font-medium cursor-pointer'
                )}
                aria-current={activeJobList == id ? 'page' : undefined}
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}

function JobListTabsError() {
  const jobsListQuery = useJobLists();

  return (
    <div className="alert alert-error text-center shadow-lg text-error-content">
      <p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-current flex-shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        Failed to load job list nav.
        <br />
      </p>
      <div className="flex-none">
        <button
          className={cn('btn btn-ghost', {
            loading: jobsListQuery.isLoading,
          })}
          disabled={jobsListQuery.isLoading}
          onClick={() => {
            jobsListQuery.refetch();
          }}
        >
          Retry
        </button>
      </div>
    </div>
  );
}
