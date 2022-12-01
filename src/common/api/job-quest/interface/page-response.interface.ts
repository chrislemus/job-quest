import { PageInfo } from './page-info.interface';

/** Job Quest API paginated response format */
export interface ApiPageRes<Data extends any> {
  data: Data[];
  pageInfo: PageInfo;
}
