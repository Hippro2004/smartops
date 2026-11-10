import RequireAuth from "@/src/components/auth/RequireAuth";
import Navbar from "@/src/components/layout/Navbar";

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <RequireAuth>
            <div className="min-h-screen bg-slate-50 md:flex">
                <Navbar />
                <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
                    {children}
                </main>
            </div>
        </RequireAuth>
    );
}