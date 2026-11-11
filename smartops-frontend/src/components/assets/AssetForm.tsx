'use client';

import { getErrorMessage } from '@/src/lib/common/exceptions/errors';
import { ASSET_CATEGORIES, ASSET_STATUSES, AssetRequest } from '@/src/types/assets/asset';
import { useState } from 'react';
import ImageUploader from './ImageUploader';
import { validateAsset } from '@/src/lib/common/validate/validator';
import LoadingButton from '../ui/LoadingButton';


interface Props {
    asset?: AssetRequest | null;          // Present for edit mode; absent for create mode.
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
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-[minmax(0,1.35fr)_minmax(250px,0.9fr)]">
                <section className="space-y-5">
                    <div className="space-y-1">
                        <h3 className="text-sm font-semibold text-slate-900">Asset information</h3>
                        <p className="text-xs text-slate-500">Enter a name and identifier to find this asset.</p>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label htmlFor="asset-name" className="mb-1.5 block text-sm font-medium text-slate-700">
                                Asset name <span className="text-rose-500">*</span>
                            </label>
                            <input
                                id="asset-name"
                                type="text"
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                placeholder="e.g. MacBook Pro 14-inch"
                                autoComplete="off"
                                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                            />
                        </div>

                        <div>
                            <label htmlFor="asset-serial" className="mb-1.5 block text-sm font-medium text-slate-700">
                                Serial Number <span className="text-rose-500">*</span>
                            </label>
                            <input
                                id="asset-serial"
                                type="text"
                                value={form.serialNumber}
                                onChange={(e) => setForm({ ...form, serialNumber: e.target.value })}
                                placeholder="e.g. C02XYZ123ABC"
                                autoComplete="off"
                                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 font-mono text-sm text-slate-900 outline-none transition placeholder:font-sans placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                            />
                            <p className="mt-1.5 text-xs text-slate-500">Identifies each asset and must be unique.</p>
                        </div>

                        <div>
                            <label htmlFor="asset-description" className="mb-1.5 block text-sm font-medium text-slate-700">
                                Description <span className="text-rose-500">*</span>
                            </label>
                            <textarea
                                id="asset-description"
                                value={form.description}
                                onChange={(e) => setForm({ ...form, description: e.target.value })}
                                rows={4}
                                placeholder="Enter the specifications or additional asset details."
                                className="w-full resize-y rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                            />
                        </div>
                    </div>
                </section>

                <section className="space-y-5">
                    <div className="space-y-1">
                        <h3 className="text-sm font-semibold text-slate-900">Category and image</h3>
                        <p className="text-xs text-slate-500">Make assets easier to identify and organize.</p>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label htmlFor="asset-category" className="mb-1.5 block text-sm font-medium text-slate-700">
                                Category <span className="text-rose-500">*</span>
                            </label>
                            <select
                                id="asset-category"
                                value={form.category ?? ''}
                                onChange={(e) =>
                                    setForm({ ...form, category: e.target.value as AssetRequest['category'] })
                                }
                                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition hover:border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                            >
                                <option value="" disabled>
                                    กรุณาเลือกหมวดหมู่
                                </option>
                                {ASSET_CATEGORIES.map((category) => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </select>
                        </div>

                        {isEdit && (
                            <div>
                                <label htmlFor="asset-status" className="mb-1.5 block text-sm font-medium text-slate-700">
                                    Status
                                </label>
                                <select
                                    id="asset-status"
                                    value={form.status}
                                    onChange={(e) =>
                                        setForm({ ...form, status: e.target.value as AssetRequest['status'] })
                                    }
                                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition hover:border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                                >
                                    {ASSET_STATUSES.map((status) => (
                                        <option key={status} value={status}>{status}</option>
                                    ))}
                                </select>
                            </div>
                        )}

                        <ImageUploader
                            value={form.image}
                            onChange={(image) => setForm((f) => ({ ...f, image }))}
                            onUploadingChange={setUploading}
                        />
                    </div>
                </section>
            </div>

            {error && (
                <div role="alert" className="flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                    <svg viewBox="0 0 20 20" fill="currentColor" className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true">
                        <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm-.75-11a.75.75 0 0 1 1.5 0v4a.75.75 0 0 1-1.5 0V7Zm.75 8.25a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clipRule="evenodd" />
                    </svg>
                    <p>{error}</p>
                </div>
            )}

            <div className="-mx-5 flex flex-col-reverse gap-3 border-t border-slate-100 px-5 pt-5 sm:-mx-7 sm:flex-row sm:justify-end sm:px-7">
                <button
                    type="button"
                    onClick={onCancel}
                    className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-200"
                >
                    Cancel
                </button>
                <LoadingButton
                    type="submit"
                    loading={submitting}
                    disabled={uploading}
                    loadingText="Saving..."
                    className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-blue-600/20 transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/20"
                >
                    {isEdit ? 'Save changes' : 'Add asset'}
                </LoadingButton>
            </div>
        </form>
    );
}