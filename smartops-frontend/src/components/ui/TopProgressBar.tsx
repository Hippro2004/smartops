'use client';

import { useEffect, useRef, useSyncExternalStore } from 'react';
import { usePathname } from 'next/navigation';
import { useDelayedFlag } from '@/src/hooks/useDelayedFlag';
import { loadingStore } from '@/src/lib/core/loadingStore';

export default function TopProgressBar() {
    const pathname = usePathname();
    const previousPathname = useRef(pathname);
    const active = useSyncExternalStore(
        loadingStore.subscribe,
        loadingStore.getSnapshot,
        loadingStore.getServerSnapshot,
    );
    const visible = useDelayedFlag(active > 0, 150, 300);

    useEffect(() => {
        if (previousPathname.current !== pathname) {
            previousPathname.current = pathname;
            loadingStore.endNavigation();
        }
    }, [pathname]);

    if (!visible) return null;

    return (
        <div className="fixed inset-x-0 top-0 z-[60] h-1 overflow-hidden bg-blue-100">
            <div className="progress-bar h-full w-1/3 bg-blue-600" />
        </div>
    );
}