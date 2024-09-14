import { z } from 'zod';

export type TCreateResBodyReturn = ReturnType<typeof createPageResBody>;
export function createPageResBody<TSchema extends z.ZodTypeAny>(
  schema: TSchema
) {
  const res = {
    items: z.array(schema),
    pageInfo: PageInfoDto,
  };
}

export const PageInfoDto = z.object({
  currentPage: z.number(),
  currentPageSize: z.number(),
  currentPageCount: z.number(),
  totalPageCount: z.number().optional(),
  totalCount: z.number().optional(),
});
