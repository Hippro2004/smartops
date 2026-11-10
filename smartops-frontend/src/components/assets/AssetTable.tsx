import { AssetResponse } from "@/src/types/assets/asset";
import StatusBadge from "./StatusBadge";
import { fileUrl } from "@/src/lib/core/file";

interface Props {
    assets: AssetResponse[];
    canEdit: boolean;
    onEdit: (asset: AssetResponse) => void;
    onDelete: (asset: AssetResponse) => void;
}

export default function AssetTable({ assets, canEdit, onEdit, onDelete }: Props) {
    if (assets.length === 0) {
        return <p className="p-6 text-center text-gray-500">ยังไม่มีอุปกรณ์</p>;
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-gray-100 border-b text-gray-600 text-sm">
                        <th className="p-3">รูป</th>
                        <th className="p-3">ID</th>
                        <th className="p-3">ชื่ออุปกรณ์</th>
                        <th className="p-3">Serial Number</th>
                        <th className="p-3">หมวด</th>
                        <th className="p-3">สถานะ</th>
                        {canEdit && <th className="p-3 text-right">จัดการ</th>}
                    </tr>
                </thead>
                <tbody>
                    {assets.map((asset) => (
                        <tr key={asset.id} className="border-b hover:bg-gray-50">
                            <td className="p-3">
                                {asset.image ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img
                                        src={fileUrl(asset.image)}
                                        alt={asset.name}
                                        className="h-10 w-10 rounded object-cover"
                                    />
                                ) : (
                                    <div className="h-10 w-10 rounded bg-gray-100" />
                                )}
                            </td>
                            <td className="p-3">#{asset.id}</td>
                            <td className="p-3 font-medium">{asset.name}</td>
                            <td className="p-3 text-gray-600 font-mono text-sm">{asset.serialNumber}</td>
                            <td className="p-3">
                                <span className="bg-gray-200 px-2 py-1 rounded text-xs">{asset.category}</span>
                            </td>
                            <td className="p-3">
                                <StatusBadge status={asset.status} />
                            </td>
                            {canEdit && (
                                <td className="p-3 text-right space-x-3 text-sm">
                                    <button onClick={() => onEdit(asset)} className="text-blue-600 hover:underline">
                                        แก้ไข
                                    </button>
                                    <button onClick={() => onDelete(asset)} className="text-red-600 hover:underline">
                                        ลบ
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