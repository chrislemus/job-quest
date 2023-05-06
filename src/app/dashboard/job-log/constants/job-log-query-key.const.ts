const pk = 'jobLog' as const;
export const jobLogQueryKey = {
  pk: [pk] as const,
  all: (jobId: number) => {
    return [pk, { jobId }] as const;
  },
};
