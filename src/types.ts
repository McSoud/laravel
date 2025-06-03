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
  next_page_url: string | null;
  total_page: number;
}

interface LaravelProps<T, E> {
  query: ReturnType<typeof useQuery<LaravelResponse<T, E>, unknown>>;
  toastError?:
    | string
    | ((err: AxiosError<LaravelError<E>> | undefined) => string | ReactNode);
  toastSuccess?: string | ((res: LaravelSuccess<T>) => string | ReactNode);
}

interface LaravelDisplay<T, E> {
  success: (data: T) => ReactNode;
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
