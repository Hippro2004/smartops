import { AssetResponse } from "@/src/types/assets/asset";
import StatusBadge from "./StatusBadge";
import { fileUrl } from "@/src/lib/core/file";

interface Props {
    assets: AssetResponse[];
    canEdit: boolean;
    deletingId: number | null;
    onEdit: (asset: AssetResponse) => void;
    onDelete: (asset: AssetResponse) => void;
}

export default function AssetTable({ assets, canEdit, deletingId, onEdit, onDelete }: Props) {
    if (assets.length === 0) {
        return (
            <div className="flex flex-col items-center px-6 py-16 text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                    <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7" aria-hidden="true">
                        <rect x="4" y="5" width="16" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
                        <path d="M8 9h8M8 12h5m-5 3h8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                    </svg>
                </span>
                <p className="mt-4 font-semibold text-slate-800">No assets yet</p>
                <p className="mt-1 text-sm text-slate-500">Assets you add will appear here.</p>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
                <thead>
                    <tr className="border-b border-slate-200 bg-slate-50/80 text-xs font-semibold uppercase tracking-wide text-slate-500">
                        <th className="px-4 py-3.5">Image</th>
                        <th className="px-4 py-3.5">ID</th>
                        <th className="px-4 py-3.5">Asset name</th>
                        <th className="px-4 py-3.5">Serial Number</th>
                        <th className="px-4 py-3.5">Category</th>
                        <th className="px-4 py-3.5">Status</th>
                        {canEdit && <th className="px-4 py-3.5 text-right">Actions</th>}
                    </tr>
                </thead>
                <tbody>
                    {assets.map((asset) => (
                        <tr key={asset.id} className="border-b border-slate-100 transition hover:bg-blue-50/30">
                            <td className="px-4 py-3">
                                {asset.image ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img
                                        src={fileUrl(asset.image)}
                                        alt={asset.name}
                                        className="h-11 w-11 rounded-xl border border-slate-200 object-cover"
                                    />
                                ) : (
                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-400">
                                        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
                                            <rect x="4" y="5" width="16" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
                                            <path d="m6 16 4-4 3 3 2-2 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                )}
                            </td>
                            <td className="px-4 py-3 text-sm tabular-nums text-slate-400">#{asset.id}</td>
                            <td className="px-4 py-3 text-sm font-semibold text-slate-800">{asset.name}</td>
                            <td className="px-4 py-3 font-mono text-xs text-slate-500">{asset.serialNumber}</td>
                            <td className="px-4 py-3">
                                <span className="inline-flex rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">{asset.category}</span>
                            </td>
                            <td className="px-4 py-3">
                                <StatusBadge status={asset.status} />
                            </td>
                            {canEdit && (
                                <td className="space-x-3 px-4 py-3 text-right text-sm">
                                    <button onClick={() => onEdit(asset)} className="rounded-lg px-2 py-1.5 font-medium text-blue-700 transition hover:bg-blue-50">
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => onDelete(asset)}
                                        disabled={deletingId === asset.id}
                                        className="rounded-lg px-2 py-1.5 font-medium text-rose-600 transition hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                        {deletingId === asset.id ? 'Deleting...' : 'Delete'}
                                    </button>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}