'use client';

import { authApi } from "@/src/lib/api";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "../auth/AuthProvider";


export default function Navbar() {
    const pathname = usePathname()
    const router = useRouter();

    const { clear } = useAuth();


    const MENU_ITEMS = [
        { href: '/dashboard', label: 'Dashboard' },
        { href: '/assets', label: 'Assets' },
    ];

    const handleLogout = async () => {
        const refreshToken = localStorage.getItem("refresh_token");
        if (refreshToken) await authApi.logout(refreshToken);
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        clear();

        router.push("/login")
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