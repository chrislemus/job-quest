import { jobService } from '../_services';

const _base = ['job'] as const;

// TODO: add type safety for one level deep object with primitive values only.
// I can create a new type for each similar factory or I can create a wrapper type.
function all(filters?: Parameters<typeof jobService.getAll>[0]) {
  // React query records undefined object values. So we strip undefined values from object
  if (filters) {
    for (const _key in filters) {
      const key = _key as keyof typeof filters;
      if (filters[key] === undefined) delete filters[key];
    }
  }
  const hasFilters = filters && Object.keys(filters).length > 0;
  return hasFilters ? ([..._base, 'all', filters] as const) : [..._base, 'all'];
}

function detail(jobId: number) {
  return [..._base, 'detail', jobId] as const;
}

export const jobQueryKeyFactory = { _base, all, detail };
