import Spinner from "./Spinnder";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    loading?: boolean;
    loadingText?: string;
}

export default function LoadingButton({
    loading = false,
    loadingText,
    children,
    disabled,
    className = '',
    ...rest
}: Props) {
    return (
        <button
            {...rest}
            disabled={disabled || loading}
            className={`inline-flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed ${className}`}
        >
            {loading && <Spinner size={18} className="text-current" />}
            {loading && loadingText ? loadingText : children}
        </button>
    );
}