import { IsNumber, IsOptional } from 'class-validator';

export class PageInfo {
  @IsNumber()
  currentPage: number;
  @IsNumber()
  currentPageSize: number;
  @IsNumber()
  currentPageCount: number;
  @IsOptional()
  @IsNumber()
  totalPageCount?: number;
  @IsOptional()
  @IsNumber()
  totalCount?: number;
}
