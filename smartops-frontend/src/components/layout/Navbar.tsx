'use client';

import { authApi } from "@/src/lib/core/api";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { isAdmin, useAuth } from "../auth/AuthProvider";
import { tokens } from "@/src/lib/auth/auth";


export default function Navbar() {
    const pathname = usePathname()
    const router = useRouter();

    const { me, clear } = useAuth();

    const MENU_ITEMS = [
        { href: '/dashboard', label: 'Dashboard' },
        { href: '/assets', label: 'Assets' },
        ...(isAdmin(me) ? [{ href: "/admin/dashboard", label: "admin" }] : []),
    ];

    const handleLogout = async () => {
        const refreshToken = tokens.refresh();

        try {
            if (refreshToken) await authApi.logout(refreshToken);

        } catch (error) {
            console.error('Logout request failed; clearing the local session anyway.', error);
        } finally {
            clear();
            router.push("/login")

        }

    }

    return (
        <nav className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
            <div className="mx-auto flex min-h-16 max-w-7xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-2 sm:px-6 lg:px-8">
                <div className="flex min-w-0 items-center gap-5 sm:gap-8">
                    <Link href="/dashboard" className="flex shrink-0 items-center gap-2.5">
                        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-sm font-bold text-white shadow-sm shadow-blue-600/20">S</span>
                        <span className="font-semibold tracking-tight text-slate-900">SmartOps</span>
                    </Link>

                    <ul className="flex items-center gap-1 overflow-x-auto">
                        {MENU_ITEMS.map((item) => {
                            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
                            return (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        aria-current={active ? 'page' : undefined}
                                        className={`whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium transition ${active
                                            ? 'bg-blue-50 text-blue-700'
                                            : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
                                            }`}
                                    >
                                        {item.label === 'admin' ? 'Admin' : item.label}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>

                <div className="flex shrink-0 items-center gap-3">
                    {me && (
                        <span className="hidden max-w-40 truncate text-sm text-slate-500 sm:block">
                            {me.firstname || me.username}
                        </span>
                    )}
                    <button
                        onClick={handleLogout}
                        className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-700 focus:outline-none focus:ring-4 focus:ring-rose-500/10"
                    >
                        ออกจากระบบ
                    </button>
                </div>
            </div>
        </nav>
    );
}