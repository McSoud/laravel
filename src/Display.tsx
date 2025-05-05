import { LaravelError, LaravelSuccess } from "./types";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { LaravelDisplay, LaravelProps } from "./types";

export default function useLaravelQuery<T, E = unknown>({
  query,
  toastError,
  toastSuccess,
}: LaravelProps<T, E>) {
  const { data, isSuccess, isError, error } = query;
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
            "Something went wrong"
    );
  }
  const Display = ({ success, error, loading }: LaravelDisplay<T, E>) => {
    const { data, isPending, isSuccess, error: err } = query;
    if (isPending) return loading ?? <p>Loading...</p>;
    if (isSuccess && data?.success)
      return typeof success === "function" ? success(data.data) : success;
    return error ? (
      typeof error === "function" ? (
        error(err as AxiosError<LaravelError<E>>)
      ) : (
        error
      )
    ) : (
      <p>Something went wrong</p>
    );
  };
  return Display;
}
