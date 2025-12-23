/*
Reusable generic types used across multiple features
*/

import type { AppointmentStatus } from "./api.types";

// Mask log type
export type maskValueType = string | number;

// Generic key-value pair type
export type KeyValuePair = {
  [key: string]: any;
};

// Generic API response type
export type ApiResponse<T> = {
  data: T;
  message?: string;
};

// Pagination type
export type Pagination = {
  page: number;
  limit: number;
  totalPages?: number;
  totalItems?: number;
};

// Sort order type
export type SortOrder = "asc" | "desc";

// Generic error type
export type ApiError = {
  statusCode: number;
  message: string;
  errors?: string[];
};
