// api-response.dto.ts
export interface ApiResponse<T> {
  data: T[];
  count: number;
  link?: {
    prev?: string;
    self?: string;
    next?: string;
    last?: string;
  };
}
