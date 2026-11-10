'use client';

import { useState } from 'react';
import { useAssets } from '@/src/hooks/useAssets';
import Modal from '@/src/components/ui/Modal';
import AssetForm from '@/src/components/assets/AssetForm';
import AssetTable from '@/src/components/assets/AssetTable';
import { isAdmin, useAuth } from '@/src/components/auth/AuthProvider';
import { AssetRequest, AssetResponse } from '@/src/types/assets/asset';
import { getErrorMessage } from '@/src/lib/common/exceptions/errors';
import AssetTableSkeleton from '@/src/components/assets/AssetTableSkeleton';

export default function AssetPage() {
    const { me } = useAuth();
    const admin = isAdmin(me);
    const { assets, loading, error, addAsset, updateAsset, removeAsset } = useAssets();

    const [formOpen, setFormOpen] = useState(false);
    const [editing, setEditing] = useState<AssetResponse | null>(null);
    const [actionError, setActionError] = useState<string | null>(null);
    const [deletingId, setDeletingId] = useState<number | null>(null);

    const openCreate = () => {
        setEditing(null);
        setFormOpen(true);
    };

    const openEdit = (asset: AssetResponse) => {
        setEditing(asset);
        setFormOpen(true);
    };

    const closeForm = () => {
        setFormOpen(false);
        setEditing(null);
    };

    const handleSubmit = async (data: AssetRequest) => {
        if (editing) {
            await updateAsset(editing.id, data);
        } else {
            await addAsset(data);
        }
        closeForm();
    };

    const handleDelete = async (asset: AssetResponse) => {
        if (!window.confirm(`Delete "${asset.name}"? This action cannot be undone.`)) return;
        setActionError(null);
        setDeletingId(asset.id);
        try {
            await removeAsset(asset.id);
        } catch (err) {
            setActionError(getErrorMessage(err));
        } finally {
            setDeletingId(null);
        }
    };

    return (
        <div className="space-y-7">
            <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <p className="text-sm font-medium text-blue-700">Inventory</p>
                    <h1 className="mt-1 text-3xl font-semibold tracking-tight text-slate-900">IT Assets</h1>
                    <p className="mt-2 text-sm text-slate-500">Manage and track all IT assets in the system.</p>
                </div>
                {admin && (
                    <button
                        onClick={openCreate}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-blue-600/20 transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/20"
                    >
                        <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" aria-hidden="true">
                            <path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                        </svg>
                        Add asset
                    </button>
                )}
            </header>

            {actionError && (
                <p role="alert" className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                    {actionError}
                </p>
            )}

            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm shadow-slate-900/[0.02]">
                {loading && <AssetTableSkeleton />}
                {error && <p role="alert" className="p-6 text-center text-sm text-rose-600">{error}</p>}
                {!loading && !error && (
                    <AssetTable
                        assets={assets ?? []}
                        canEdit={admin}
                        deletingId={deletingId}
                        onEdit={openEdit}
                        onDelete={handleDelete}
                    />
                )}
            </section>

            {formOpen && (
                <Modal title={editing ? 'Edit asset' : 'Add asset'} onClose={closeForm}>
                    <AssetForm asset={editing} onSubmit={handleSubmit} onCancel={closeForm} />
                </Modal>
            )}
        </div>
    );
}