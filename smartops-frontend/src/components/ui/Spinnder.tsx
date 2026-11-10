interface SpinnerProps {
    size?: number;
    className?: string;
}

export default function Spinner({ size = 40, className = 'text-blue-600' }: SpinnerProps) {
    return (
        <svg
            className={`spinner-material ${className}`}
            width={size}
            height={size}
            viewBox="22 22 44 44"
            role="status"
            aria-label="Loading"
        >
            <circle cx="44" cy="44" r="20.2" fill="none" stroke="currentColor" strokeWidth="3.6" />
        </svg>
    );
}