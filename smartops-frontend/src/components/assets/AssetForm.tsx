'use client';

import { getErrorMessage } from '@/src/lib/common/exceptions/errors';
import { ASSET_CATEGORIES, ASSET_STATUSES, AssetRequest } from '@/src/types/assets/asset';
import { useState } from 'react';
import ImageUploader from './ImageUploader';
import { validateAsset } from '@/src/lib/common/validate/validator';


interface Props {
    asset?: AssetRequest | null;          // มี = โหมดแก้ไข, ไม่มี = โหมดเพิ่ม
    onSubmit: (data: AssetRequest) => Promise<void>;
    onCancel: () => void;
}

export default function AssetForm({ asset, onSubmit, onCancel }: Props) {
    const isEdit = !!asset;
    const [form, setForm] = useState<AssetRequest>({
        name: asset?.name ?? '',
        serialNumber: asset?.serialNumber ?? '',
        category: asset?.category ?? 'LAPTOP',
        status: asset?.status ?? 'AVAILABLE',
        description: asset?.description ?? '',
        image: asset?.image ?? null
    });

    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        const message = validateAsset(form);
        if (message) {
            setError(message);
            return;
        }

        setSubmitting(true);
        try {
            await onSubmit({
                ...form,
                name: form.name.trim(),
                serialNumber: form.serialNumber.trim(),
                description: form.description.trim(),
            });
        } catch (err) {
            setError(getErrorMessage(err));
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ชื่ออุปกรณ์</label>
                <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full border p-2 rounded"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Serial Number</label>
                <input
                    type="text"
                    value={form.serialNumber}
                    onChange={(e) => setForm({ ...form, serialNumber: e.target.value })}
                    className="w-full border p-2 rounded font-mono"
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">หมวด</label>
                    <select
                        value={form.category ?? ''}
                        onChange={(e) =>
                            setForm({ ...form, category: e.target.value as AssetRequest['category'] })
                        }
                        className="w-full border p-2 rounded"
                    >
                        {ASSET_CATEGORIES.map((c) => (
                            <option key={c} value={c}>{c}</option>
                        ))}
                    </select>
                </div>

                {isEdit && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">สถานะ</label>
                        <select
                            value={form.status}
                            onChange={(e) =>
                                setForm({ ...form, status: e.target.value as AssetRequest['status'] })
                            }
                            className="w-full border p-2 rounded"
                        >
                            {ASSET_STATUSES.map((s) => (
                                <option key={s} value={s}>{s}</option>
                            ))}
                        </select>
                    </div>
                )}
            </div>

            <ImageUploader
                value={form.image}
                onChange={(image) => setForm((f) => ({ ...f, image }))}
                onUploadingChange={setUploading}
            />

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">รายละเอียด (สเปก)</label>
                <textarea
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    rows={3}
                    className="w-full border p-2 rounded"
                />
            </div>

            {error && <p className="text-red-600 text-sm">{error}</p>}

            <div className="flex justify-end gap-3">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 rounded border text-gray-600 hover:bg-gray-50"
                >
                    ยกเลิก
                </button>
                <button
                    type="submit"
                    disabled={submitting}
                    className="px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-50"
                >
                    {submitting ? 'กำลังบันทึก...' : 'บันทึก'}
                </button>
            </div>
        </form>
    );
}