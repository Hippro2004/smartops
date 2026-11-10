import { AssetStatus } from "@/src/types/assets/asset";

const STYLES: Record<AssetStatus, string> = {
    AVAILABLE: 'bg-green-100 text-green-700',
    IN_USE: 'bg-blue-100 text-blue-700',
    RETIRED: 'bg-red-100 text-red-700',
};

export default function StatusBadge({ status }: { status: AssetStatus }) {
    return (
        <span className={`px-2 py-1 rounded text-xs font-semibold ${STYLES[status]}`}>
            {status}
        </span>
    );
}