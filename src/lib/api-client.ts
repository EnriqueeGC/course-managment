import { env } from '@/config/env';
import axios, { type AxiosRequestConfig } from 'axios';

const BASE_URL = env.API_URL;

// Custon error type for API failures
export class ApiError extends Error {
  status: number;
  data?: unknown;

  constructor(status: number, message: string, data?: unknown) {
    super(message);
    this.status = status;
    this.data = data;
    this.name = 'ApiError';
  }
}

export type QueryValue =
  | string
  | number
  | boolean
  | Array<string | number | boolean>
  | undefined
  | null;

export type QueryParams = Record<string, QueryValue>;

export interface ApiOptions extends AxiosRequestConfig {
  params?: QueryParams;
}

export interface ApiErrorBody {
  message?: string;
  errors?: Record<string, string>;
}

export function getApiErrorMessage(
  error: unknown,
  fallback: string,
): string {
  if (error instanceof ApiError) {
    const data = error.data as ApiErrorBody | undefined;
    return data?.message ?? error.message ?? fallback;
  }

  return fallback;
}

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

function cleanQueryParams(
  params?: QueryParams,
): Record<string, unknown> | undefined {
  if (!params) return undefined;

  const cleaned: Record<string, unknown> = {};

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') {
      return;
    }
    if (Array.isArray(value)) {
      const validItems = value.filter(
        (item) => item !== undefined && item !== null && item !== '',
      );
      if (validItems.length > 0) {
        cleaned[key] = validItems;
      }
      return;
    }
    cleaned[key] = value;
  });

  return cleaned;
}

export async function apiClient<T>(
  endpoint: string,
  options: ApiOptions = {},
): Promise<T> {
  const { params, headers, ...restOptions } = options;
  const cleanedParams = cleanQueryParams(params);

  try {
    const response = await axiosInstance.request<T>({
      url: endpoint,
      params: cleanedParams,
      headers,
      ...restOptions,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status ?? 500;
      const errorData = error.response?.data;
      const message =
        error.message || 'An error occurred while making the API request.';
      throw new ApiError(status, message, errorData);
    }
    throw new ApiError(
      500,
      error instanceof Error ? error.message : 'An unknown error occurred.',
    );
  }
}
