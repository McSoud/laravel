import { LaravelProps } from "./types";
import "./laravelOptions";
import useLarQuery from "./Display";
import options from "./laravelOptions";

export { options as laravelOptions };

export function useLaravelQuery<T, E = unknown>(args: LaravelProps<T, E>) {
  return useLarQuery<T, E>(args);
}

export * from "./types";
