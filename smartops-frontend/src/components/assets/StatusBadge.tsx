import { AssetStatus } from "@/src/types/assets/asset";

const STYLES: Record<AssetStatus, string> = {
    AVAILABLE: 'border-emerald-200 bg-emerald-50 text-emerald-700',
    IN_USE: 'border-blue-200 bg-blue-50 text-blue-700',
    RETIRED: 'border-rose-200 bg-rose-50 text-rose-700',
};

export default function StatusBadge({ status }: { status: AssetStatus }) {
    return (
        <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${STYLES[status]}`}>
            <span className="h-1.5 w-1.5 rounded-full bg-current" />
            {status}
        </span>
    );
}