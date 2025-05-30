import { LaravelError, LaravelSuccess } from "./types";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { LaravelDisplay, LaravelProps } from "./types";
import { useEffect } from "react";
import laravelOptions from "./laravelOptions";
export default function useLaravelQuery<T, E = unknown>({
  query,
  toastError,
  toastSuccess,
}: LaravelProps<T, E>) {
  const { data, isSuccess, isError, error } = query;
  useEffect(() => {
    if (isSuccess && data?.success) {
      if (toastSuccess)
        toast.success(
          typeof toastSuccess === "string"
            ? toastSuccess
            : toastSuccess(data.data as LaravelSuccess<T>)
        );
    }
    if (isError) {
      console.error(data);
      toast.error(
        toastError
          ? typeof toastError === "string"
            ? toastError
            : toastError(error as AxiosError<LaravelError<E>>)
          : (error as AxiosError<LaravelError<E>>).response?.data.message ??
              laravelOptions.errorToast
      );
    }
  }, [isSuccess, isError]);
  function Display({ success, error, loading }: LaravelDisplay<T, E>) {
    const { data, isLoading, isSuccess, error: err } = query;
    const Tag = loading ? "div" : "p";
    if (isLoading) return <Tag>{loading ?? laravelOptions.loading}</Tag>;
    return isSuccess
      ? data?.success && success(data.data)
      : error
      ? typeof error === "function"
        ? error(err as AxiosError<LaravelError<E>>)
        : error
      : laravelOptions.error;
  }
  return Display;
}
