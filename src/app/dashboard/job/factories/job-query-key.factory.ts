import { jobService } from '@api/job-quest/job/job.service';

// TODO: change to .const extension and update other keys.
// Also implement `queryFn` query context
// https://tkdodo.eu/blog/leveraging-the-query-function-context
const _scope = { scope: 'job' } as const;
export const jobKeys = {
  // ✅ all keys are arrays with exactly one object
  _scope,
  detail: (jobId: number) => [{ ..._scope, jobId }] as const,
  all: (filters: Parameters<typeof jobService.getAll>[0] = {}) => {
    return [{ ..._scope, ...filters }] as const;
  },
};

// const _base = ['job'] as const;

// // TODO: add type safety for one level deep object with primitive values only.
// // I can create a new type for each similar factory or I can create a wrapper type.
// function all(filters?: Parameters<typeof jobService.getAll>[0]) {
//   let params: URLSearchParams | undefined;

//   // React query records undefined object values. So we strip undefined values from object
//   if (filters && Object.keys(filters).length > 0) {
//     params = new URLSearchParams();
//     for (const [key, value] of Object.entries(filters)) {
//       if (value !== undefined) params.set(key, `${value}`);
//     }
//   }
//   // const hasFilters = filters && Object.keys(filters).length > 0;
//   return params
//     ? ([..._base, 'all', params.toString()] as const)
//     : [..._base, 'all'];
// }

// function detail(jobId: number) {
//   return [..._base, 'detail', jobId] as const;
// }

// export const jobQueryKeyFactory = { all, detail };
