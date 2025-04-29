import { LaravelProps } from "./types";
import useLarQuery from "./Display";

export function useLaravelQuery<T, E = unknown>(args: LaravelProps<T, E>) {
  return useLarQuery<T, E>(args);
}

export * from "./types";
