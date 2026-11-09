import RequireAdmin from "@/src/components/auth/RequireAdmin";
import Navbar from "@/src/components/layout/Navbar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <RequireAdmin>
            <div className="min-h-screen bg-gray-50">
                <Navbar />
                <main className="max-w-6xl mx-auto p-8">{children}</main>
            </div>
        </RequireAdmin>);
}