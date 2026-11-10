'use client';

import CategoryBars from "@/src/components/dashboard/CategoryBars";
import StatCard from "@/src/components/dashboard/StatCard";
import PageLoader from "@/src/components/ui/PageLoader";
import { getErrorMessage } from "@/src/lib/common/exceptions/errors";
import { dashboardApi } from "@/src/lib/core/api";
import { DashboardStats } from "@/src/types/assets/dashboard";
import { useEffect, useState } from "react";

export default function AdminDashboardPage() {
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        dashboardApi
            .getStats()
            .then((data) => setStats(data as unknown as DashboardStats))
            .catch((err) => setError(getErrorMessage(err)))
            .finally(() => setLoading(false))
    }, [])

    if (loading) return <p className="text-gray-500">Loading...</p>;
    if (error) return <p className="text-red-600">{error}</p>;
    if (!stats) return null;

    return (<div className="space-y-8">
        {loading && <PageLoader />}
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <StatCard label="อุปกรณ์ทั้งหมด" value={stats.totalAssets} />
            <StatCard label="ว่าง" value={stats.available} color="text-green-600" />
            <StatCard label="ใช้งานอยู่" value={stats.inUse} color="text-blue-600" />
            <StatCard label="ชำรุด" value={stats.retried} color="text-red-600" />
            <StatCard label="ผู้ใช้ทั้งหมด" value={stats.totalUsers} />
        </div>

        <section className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
                อุปกรณ์แยกตามหมวด
            </h2>
            <CategoryBars data={stats.byCategory} />
        </section>
    </div>);
}