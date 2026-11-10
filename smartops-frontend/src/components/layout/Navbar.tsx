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

        } finally {
            clear();
            router.push("/login")

        }

    }

    return (
        <nav className="bg-white border-b">
            <div className="max-w-6xl mx-auto px-8 h-14 flex items-center justify-between">
                <div className="flex items-center gap-8">
                    <span className="font-bold text-gray-800">SmartOps</span>

                    <ul className="flex items-center gap-1">
                        {MENU_ITEMS.map((item) => {
                            const active = pathname.startsWith(item.href);
                            return (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        className={`px-3 py-2 rounded text-sm font-medium ${active
                                            ? 'bg-blue-50 text-blue-600'
                                            : 'text-gray-600 hover:bg-gray-100'
                                            }`}
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>

                <button
                    onClick={handleLogout}
                    className="text-sm text-gray-600 hover:text-red-600"
                >
                    Logout
                </button>
            </div>
        </nav>
    );
}