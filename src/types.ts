import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ReactNode } from "react";

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

interface LaravelProps<T, E> {
  query: ReturnType<typeof useQuery<LaravelResponse<T, E>, unknown>>;
  toastError?:
    | string
    | ((err: AxiosError<LaravelError<E>> | undefined) => string | ReactNode);
  toastSuccess?: string | ((res: LaravelSuccess<T>) => string | ReactNode);
}

interface LaravelDisplay<T, E> {
  success: ReactNode | ((data: T) => ReactNode);
  loading?: ReactNode;
  error?: ReactNode | ((err: AxiosError<LaravelError<E>>) => ReactNode);
}

export {
  type LaravelResponse,
  type LaravelSuccess,
  type LaravelError,
  type LaravelObject,
  type LaravelPagination,
  type LaravelProps,
  type LaravelDisplay,
};
