const pk = 'user' as const;
export const userQueryKey = {
  pk: [pk] as const,
  detail: [pk],
};
