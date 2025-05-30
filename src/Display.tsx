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
    return (
      <>
        {isSuccess ? (
          data?.success && typeof success === "function" ? (
            success(data.data)
          ) : (
            success
          )
        ) : error ? (
          typeof error === "function" ? (
            error(err as AxiosError<LaravelError<E>>)
          ) : (
            error
          )
        ) : (
          <p>Something went wrong</p>
        )}
        <Loading state={isLoading} component={loading} />
      </>
    );
  };
  function Loading({
    state = true,
    component,
  }: {
    state: boolean;
    component: LaravelDisplay<T, E>["loading"];
  }) {
    const [removed, setRemoved] = useState(!state);
    if (!state) setTimeout(() => setRemoved(true), 499);
    if (removed) return null;
    const Tag = component ? "div" : "p";
    return (
      <Tag className={`animate-fade-in${!state ? " animate-fade-out" : ""}`}>
        {component ?? "Loading..."}
      </Tag>
    );
  }
  return Display;
}
