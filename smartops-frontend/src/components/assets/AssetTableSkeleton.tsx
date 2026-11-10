import Skeleton from '@/src/components/ui/Skeleton';

export default function AssetTableSkeleton({ rows = 6 }: { rows?: number }) {
    return (
        <div className="divide-y divide-slate-100" aria-label="Loading assets" role="status">
            {Array.from({ length: rows }).map((_, i) => (
                <div key={i} className="flex items-center gap-4 px-4 py-3">
                    <Skeleton className="h-11 w-11 rounded-xl" />
                    <Skeleton className="h-4 w-12" />
                    <Skeleton className="h-4 flex-1" />
                    <Skeleton className="hidden h-4 w-32 sm:block" />
                    <Skeleton className="h-6 w-20 rounded-full" />
                </div>
            ))}
        </div>
    );
}