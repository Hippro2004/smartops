'use client';

import { authApi } from '@/src/lib/core/api';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { isAdmin, useAuth } from '../auth/AuthProvider';
import { tokens } from '@/src/lib/auth/auth';

export default function Navbar() {
    const pathname = usePathname();
    const router = useRouter();
    const { me, clear } = useAuth();

    const menuItems = [
        // { href: '/dashboard', label: 'Dashboard' },
        { href: '/assets', label: 'Assets' },
        { href: '/profile', label: 'Personal information' },
        ...(isAdmin(me) ? [{ href: '/admin/dashboard', label: 'Admin' }] : []),
    ];

    const handleLogout = async () => {
        const refreshToken = tokens.refresh();
        try {
            if (refreshToken) await authApi.logout(refreshToken);
        } catch (error) {
            console.error('Logout request failed; clearing the local session anyway.', error);
        } finally {
            clear();
            router.push('/login');
        }
    };

    return (
        <aside className="sticky top-0 z-30 border-b border-slate-200 bg-white md:h-screen md:w-64 md:shrink-0 md:border-b-0 md:border-r">
            <div className="flex flex-wrap items-center justify-between px-4 py-3 md:h-full md:flex-nowrap md:flex-col md:items-stretch md:justify-start md:gap-8 md:px-5 md:py-6">
                <Link href="/dashboard" className="flex shrink-0 items-center gap-2.5">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-sm font-bold text-white shadow-sm shadow-blue-600/20">S</span>
                    <span className="font-semibold tracking-tight text-slate-900">SmartOps</span>
                </Link>

                <nav aria-label="Main navigation" className="order-last w-full min-w-0 border-t border-slate-100 pt-2 md:order-none md:w-auto md:flex-1 md:border-0 md:pt-0">
                    <ul className="flex items-center gap-1 overflow-x-auto md:flex-col md:items-stretch md:overflow-visible">
                        {menuItems.map((item) => {
                            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
                            return (
                                <li key={item.href} className="shrink-0">
                                    <Link
                                        href={item.href}
                                        aria-current={active ? 'page' : undefined}
                                        className={`block whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium transition ${active
                                            ? 'bg-blue-50 text-blue-700'
                                            : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
                                            }`}
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                <div className="hidden border-t border-slate-100 pt-5 md:block">
                    <Link href="/profile" className="mb-3 block rounded-lg px-3 py-2 hover:bg-slate-50">
                        <span className="block truncate text-sm font-medium text-slate-800">
                            {me?.firstname || me?.username}
                        </span>
                        <span className="mt-0.5 block truncate text-xs text-slate-500">{me?.email}</span>
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="w-full rounded-lg border border-slate-200 px-3 py-2 text-left text-sm font-medium text-slate-600 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-700 focus:outline-none focus:ring-4 focus:ring-rose-500/10"
                    >
                        Sign out
                    </button>
                </div>

                <button
                    onClick={handleLogout}
                    className="shrink-0 rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-700 focus:outline-none focus:ring-4 focus:ring-rose-500/10 md:hidden"
                >
                    Sign out
                </button>
            </div>
        </aside>
    );
}
