'use client';

import { useState } from 'react';
import { useAssets } from '@/src/hooks/useAssets';
import Modal from '@/src/components/ui/Modal';
import AssetForm from '@/src/components/assets/AssetForm';
import AssetTable from '@/src/components/assets/AssetTable';
import { isAdmin, useAuth } from '@/src/components/auth/AuthProvider';
import { AssetRequest, AssetResponse } from '@/src/types/assets/asset';
import { getErrorMessage } from '@/src/lib/common/exceptions/errors';
import PageLoader from '@/src/components/ui/PageLoader';

export default function AssetPage() {
    const { me } = useAuth();
    const admin = isAdmin(me);
    const { assets, loading, error, addAsset, updateAsset, removeAsset } = useAssets();

    const [formOpen, setFormOpen] = useState(false);
    const [editing, setEditing] = useState<AssetResponse | null>(null);
    const [actionError, setActionError] = useState<string | null>(null);

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
        if (!window.confirm(`ลบ "${asset.name}" ใช่ไหม? การลบย้อนกลับไม่ได้`)) return;
        setActionError(null);
        try {
            await removeAsset(asset.id);
        } catch (err) {
            setActionError(getErrorMessage(err));
        }
    };

    return (
        <div className="space-y-6">
            {loading && <PageLoader />}
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-gray-800">IT Assets</h1>
                {admin && (
                    <button
                        onClick={openCreate}
                        className="bg-blue-600 text-white px-4 py-2 rounded font-semibold hover:bg-blue-700"
                    >
                        + เพิ่มอุปกรณ์
                    </button>
                )}
            </div>

            {actionError && <p className="text-red-600 text-sm">{actionError}</p>}

            <section className="bg-white rounded-xl shadow-sm overflow-hidden">
                {loading && <p className="p-6 text-center text-gray-500">Loading...</p>}
                {error && <p className="p-6 text-center text-red-600">{error}</p>}
                {!loading && !error && (
                    <AssetTable
                        assets={assets ?? []}
                        canEdit={admin}
                        onEdit={openEdit}
                        onDelete={handleDelete}
                    />
                )}
            </section>

            {formOpen && (
                <Modal title={editing ? 'แก้ไขอุปกรณ์' : 'เพิ่มอุปกรณ์'} onClose={closeForm}>
                    <AssetForm asset={editing} onSubmit={handleSubmit} onCancel={closeForm} />
                </Modal>
            )}
        </div>
    );
}