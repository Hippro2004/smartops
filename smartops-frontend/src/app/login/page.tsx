import LoginForm from "@/src/components/auth/LoginForm";
import Link from "next/link";

export default function LoginPage() {
    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Login</h1>
                    <p className="text-sm text-gray-500 mt-1">SmartOps IT Asset Management</p>
                </div>

                <LoginForm />
                <p className="mt-4 text-center text-sm text-gray-600">
                    ยังไม่มีบัญชี?{' '}
                    <Link
                        href="/register"
                        className="font-semibold text-blue-600 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                    >
                        สมัครสมาชิก
                    </Link>
                </p>
            </div>
        </main>)

}