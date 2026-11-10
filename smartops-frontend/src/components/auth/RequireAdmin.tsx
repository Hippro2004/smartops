'use client';
import { useRouter } from "next/navigation";
import { isAdmin, useAuth } from "./AuthProvider";
import { useEffect } from "react";
import { useDelayedFlag } from "@/src/hooks/useDelayedFlag";
import PageLoader from "../ui/PageLoader";

export default function RequireAdmin({ children }: { children: React.ReactNode }) {
    const { me, loading } = useAuth();
    const router = useRouter();
    const showLoader = useDelayedFlag(loading || !me, 150, 300)

    useEffect(() => {
        if (loading) return;
        if (!me) router.replace('/login');
        else if (!isAdmin(me)) router.replace('/dashboard');
    }, [loading, me, router]);

    if (loading || !isAdmin(me))
        return showLoader ? < PageLoader fullscreen /> : null;

    return <>{children}</>;
}