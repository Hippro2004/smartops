'use client';

import CategoryBars from "@/src/components/dashboard/CategoryBars";
import StatCard from "@/src/components/dashboard/StatCard";
import Skeleton from "@/src/components/ui/Skeleton";
import { getErrorMessage } from "@/src/lib/common/exceptions/errors";
import { dashboardApi } from "@/src/lib/core/api";
import { DashboardStats } from "@/src/types/assets/dashboard";
import { useEffect, useState } from "react";

export default function AdminDashboardPage() {
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        dashboardApi
            .getStats()
            .then((data) => setStats(data))
            .catch((err) => setError(getErrorMessage(err)))
            .finally(() => setLoading(false))
    }, [])

    if (loading) {
        return (
            <div className="space-y-8">
                <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-9 w-64" />
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <Skeleton key={i} className="h-24" />
                    ))}
                </div>
                <Skeleton className="h-48" />
            </div>
        );
    }
    if (error) return <p role="alert" className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p>;
    if (!stats) return null;

    return (<div className="space-y-8">
        <header>
            <p className="text-sm font-medium text-blue-700">Overview</p>
            <h1 className="mt-1 text-3xl font-semibold tracking-tight text-slate-900">Admin Dashboard</h1>
            <p className="mt-2 text-sm text-slate-500">ภาพรวมการใช้งานทรัพย์สินและผู้ใช้ในระบบ</p>
        </header>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <StatCard label="อุปกรณ์ทั้งหมด" value={stats.totalAssets || 0} accent="bg-slate-500" />
            <StatCard label="ว่าง" value={stats.available || 0} color="text-emerald-700" accent="bg-emerald-500" />
            <StatCard label="ใช้งานอยู่" value={stats.inUse || 0} color="text-blue-700" accent="bg-blue-500" />
            <StatCard label="ปลดระวาง" value={stats.retired || 0} color="text-rose-700" accent="bg-rose-500" />
            <StatCard label="ผู้ใช้ทั้งหมด" value={stats.totalUsers || 0} accent="bg-violet-500" />
        </div>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-900/[0.02] sm:p-7">
            <div className="mb-6">
                <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">Inventory breakdown</p>
                <h2 className="mt-1 text-lg font-semibold text-slate-900">อุปกรณ์แยกตามหมวด</h2>
            </div>
            <CategoryBars data={stats.byCategory} />
        </section>
    </div>);
}