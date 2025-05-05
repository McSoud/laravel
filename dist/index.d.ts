import { LaravelProps } from "./types";
export declare function useLaravelQuery<T, E = unknown>(args: LaravelProps<T, E>): ({ success, error, loading }: import("./types").LaravelDisplay<T, E>) => string | number | bigint | boolean | Iterable<import("react").ReactNode> | Promise<string | number | bigint | boolean | import("react").ReactPortal | import("react").ReactElement<unknown, string | import("react").JSXElementConstructor<any>> | Iterable<import("react").ReactNode> | null | undefined> | import("react/jsx-runtime").JSX.Element | null | undefined;
export * from "./types";
