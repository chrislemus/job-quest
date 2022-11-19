/** Job Quest API error response format */
export interface ApiErrorRes {
  /** HTTP Status code */
  statusCode: number;
  /** text describing HTTP Status code */
  error?: string;
  /** User friendly error messages that could be displayed via UI */
  messages?: string[];
}
