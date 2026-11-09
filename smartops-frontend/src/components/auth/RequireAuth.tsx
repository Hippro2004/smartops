'use client';
import { useRouter } from "next/navigation";
import { useAuth } from "./AuthProvider";
import { useEffect } from "react";


export default function RequireAuth({ children }: { children: React.ReactNode }) {
    const { me, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !me) router.replace('/login');
    }, [loading, me, router]);

    if (loading || !me) return <p className="p-6 text-gray-500">กำลังตรวจสอบสิทธิ์...</p>;
    return <>{children}</>;
}