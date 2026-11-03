import RegisterForm from '@/src/components/auth/RegisterForm';
import Link from 'next/link';

export default function RegisterPage() {
    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Create Account</h1>
                    <p className="text-sm text-gray-500 mt-1">SmartOps IT Asset Management</p>
                </div>

                <RegisterForm />
            </div>
        </main>
    );
}