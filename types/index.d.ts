import useLaravelQuery from "../Display";

type LaravelResponse<S = unknown, E = unknown> =
  | LaravelSuccess<S>
  | LaravelError<E>
  | undefined;

interface LaravelSuccess<T = unknown> {
  success: true;
  message: string;
  data: T;
}

interface LaravelError<T extends Array<string> | unknown = unknown> {
  success: false;
  message: string;
  errors?: T extends Array<string> ? { [k in T[number]]: string[] } : T;
}

interface LaravelObject {
  id: number;
  created_at: string;
  updated_at: string;
}

interface LaravelPagination<T = unknown> {
  current_page: number;
  data: T;
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: { url: string | null; label: string; active: boolean }[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

type TODO = any;

export {
  useLaravelQuery,
  type LaravelResponse,
  type LaravelSuccess,
  type LaravelError,
  type LaravelObject,
  type LaravelPagination,
  type TODO,
};
