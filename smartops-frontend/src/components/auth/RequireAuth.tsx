'use client';
import { useRouter } from "next/navigation";
import { useAuth } from "./AuthProvider";
import { useEffect } from "react";
import PageLoader from "../ui/PageLoader";


export default function RequireAuth({ children }: { children: React.ReactNode }) {
    const { me, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !me) router.replace('/login');
    }, [loading, me, router]);

    if (loading || !me) return <PageLoader fullscreen></PageLoader>;
    return <>{children}</>;
}