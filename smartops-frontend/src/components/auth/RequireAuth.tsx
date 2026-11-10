'use client';
import { useRouter } from "next/navigation";
import { useAuth } from "./AuthProvider";
import { useEffect } from "react";
import PageLoader from "../ui/PageLoader";
import { useDelayedFlag } from "@/src/hooks/useDelayedFlag";


export default function RequireAuth({ children }: { children: React.ReactNode }) {
    const { me, loading } = useAuth();
    const router = useRouter();
    const showLoader = useDelayedFlag(loading || !me, 150, 300)

    useEffect(() => {
        if (!loading && !me) router.replace('/login');
    }, [loading, me, router]);

    if (loading || !me) return showLoader ? < PageLoader fullscreen /> : null;
    return <>{children}</>;
}