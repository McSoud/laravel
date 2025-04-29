import { useQuery } from "@tanstack/react-query";
import { LaravelError, LaravelResponse, LaravelSuccess } from "./types/index";
import { AxiosError } from "axios";
import { ReactNode } from "react";

export interface LaravelProps<T, E> {
  query: ReturnType<typeof useQuery<LaravelResponse<T, E>, unknown>>;
  toastError?:
    | string
    | ((err: AxiosError<LaravelError<E>> | undefined) => string | ReactNode);
  toastSuccess?: string | ((res: LaravelSuccess<T>) => string | ReactNode);
}

export interface LaravelDisplay<T, E> {
  success: ReactNode | ((data: T) => ReactNode);
  loading?: ReactNode;
  error?: ReactNode | ((err: AxiosError<LaravelError<E>>) => ReactNode);
}
