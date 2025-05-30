import { LaravelError, LaravelSuccess } from "./types";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { LaravelDisplay, LaravelProps } from "./types";
import { useState } from "react";

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
    const { data, isLoading, isSuccess, error: err } = query;
    const [loadingState, setLoadingState] = useState(isLoading);
    const Tag = loading ? "div" : "p";
    if (!isLoading) setTimeout(() => setLoadingState(true), 499);
    return (
      <div style={{ display: "grid", gridTemplateAreas: "a" }}>
        <div style={{ gridArea: "a" }}>
          {!isLoading &&
            (isSuccess ? (
              data?.success && typeof success === "function" ? (
                success(data.data)
              ) : (
                typeof success
              )
            ) : error ? (
              typeof error === "function" ? (
                error(err as AxiosError<LaravelError<E>>)
              ) : (
                error
              )
            ) : (
              <p>Something went wrong</p>
            ))}
        </div>
        <div style={{ gridArea: "a" }}>
          {loadingState && (
            <Tag
              className={`animate-fade-in${
                !isLoading ? " animate-fade-out" : ""
              }`}
            >
              {loading ?? "Loading..."}
            </Tag>
          )}
        </div>
      </div>
    );
  };
  return Display;
}
