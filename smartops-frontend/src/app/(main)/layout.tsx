import Navbar from "@/src/components/layout/Navbar";

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main className="max-w-6xl mx-auto p-8">{children}</main>
        </div>
    );
}