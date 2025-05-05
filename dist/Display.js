import { jsx as _jsx } from "react/jsx-runtime";
import { toast } from "sonner";
export default function useLaravelQuery({ query, toastError, toastSuccess, }) {
    const { data, isSuccess, isError, error } = query;
    if (isSuccess && data?.success) {
        if (toastSuccess)
            toast.success(typeof toastSuccess === "string"
                ? toastSuccess
                : toastSuccess(data.data));
    }
    if (isError) {
        console.error(data);
        toast.error(toastError
            ? typeof toastError === "string"
                ? toastError
                : toastError(error)
            : error.response?.data.message ??
                "Something went wrong");
    }
    const Display = ({ success, error, loading }) => {
        const { data, isPending, isSuccess, error: err } = query;
        if (isPending)
            return loading ?? _jsx("p", { children: "Loading..." });
        if (isSuccess && data?.success)
            return typeof success === "function" ? success(data.data) : success;
        return error ? (typeof error === "function" ? (error(err)) : (error)) : (_jsx("p", { children: "Something went wrong" }));
    };
    return Display;
}
