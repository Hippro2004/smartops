import Spinner from "./Spinnder";

interface PageLoaderProps {
    fullscreen?: boolean;
    label?: string;
}

export default function PageLoader({ fullscreen = false, label }: PageLoaderProps) {
    const wrapper = fullscreen
        ? 'fixed inset-0 z-50 flex flex-col items-center justify-center gap-3 bg-white/80'
        : 'flex min-h-[50vh] flex-col items-center justify-center gap-3';

    return (
        <div className={wrapper}>
            <Spinner size={48} />
            {label && <p className="text-sm text-gray-500">{label}</p>}
        </div>
    );
}