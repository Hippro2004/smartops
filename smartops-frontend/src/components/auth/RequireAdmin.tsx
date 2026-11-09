'use client';
import { useRouter } from "next/navigation";
import { isAdmin, useAuth } from "./AuthProvider";
import { useEffect } from "react";

export default function RequireAdmin({ children }: { children: React.ReactNode }) {
    const { me, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (loading) return;
        if (!me) router.replace('/login');
        else if (!isAdmin(me)) router.replace('/dashboard');
    }, [loading, me, router]);

    if (loading || !isAdmin(me)) {
        return <p className="p-6 text-gray-500">กำลังตรวจสอบสิทธิ์...</p>;
    }
    return <>{children}</>;
}