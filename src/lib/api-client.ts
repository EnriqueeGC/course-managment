import { env } from '@/config/env';

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

export interface ApiOptions extends RequestInit {
  params?: QueryParams;
};

export async function apiClient<T>(
  endpoint: string,
  options: ApiOptions = {},
): Promise<T> {
  const { params, headers: customHeaders, ...restOptions } = options;

  const normalizedBase = BASE_URL.replace(/\/+$/, '');
  const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  let url = `${normalizedBase}${normalizedEndpoint}`;

  if (params){
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value === undefined || value === null || value === ''){
        return;
      }
      if (Array.isArray(value)) {
        value.forEach((item) => {
          if (item !== undefined && item !== null && item !== '') {
            searchParams.append(key, String(item));
          }
        });
        return;
      }
      searchParams.append(key, String(value));
    });

    const queryString = searchParams.toString();
    if(queryString){
      const separator = url.includes('?') ? '&' : '?';
      url += `${separator}${queryString}`;
    };
  };

  // COnfigure default headers
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...customHeaders,
  };

  // Execute request
  const response = await fetch(url, {
    ...restOptions,
    headers,
    credentials: options.credentials ?? 'include',
  });

  // Centralized Error Handling
  if (!response.ok) {
    let errorData: unknown;
    try {
      errorData = await response.json();
    } catch {
      // response was not json
    }

    // Intercept specific status codes
    if (response.status === 401) {
      // Clear local session or trigger redirect to login
      if (
        typeof window !== 'undefined' &&
        !window.location.pathname.startsWith('/login')
      ) {
        window.location.href = '/login';
      }
    }

    throw new ApiError(
      response.status,
      `API Request Failed: ${response.statusText}`,
      errorData,
    );
  }

  if (response.status === 204){
    return {} as T;
  };

  return (await response.json()) as T;
}
