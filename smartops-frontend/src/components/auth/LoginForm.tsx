'use client';
import { authApi } from '@/src/lib/api';
import { getErrorMessage } from '@/src/lib/errors';
import { LoginInput } from '@/src/types/auth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { isAdmin, useAuth } from './AuthProvider';
import { tokens } from '@/src/lib/auth';


export default function LoginForm() {
    const router = useRouter();
    const [form, setForm] = useState<LoginInput>({ username: '', password: '' });
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { refreshMe } = useAuth();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true)
        setError(null);

        try {
            const res = await authApi.login(form);
            // localStorage.setItem('access_token', res.accessToken);
            // localStorage.setItem('refresh_token', res.refreshToken)

            tokens.save(res);
            const me = await refreshMe();
            router.push(isAdmin(me) ? '/admin' : "/dashboard");

        } catch (error) {
            setError(getErrorMessage(error))

        } finally {
            setSubmitting(false)
        }
    };

    return (
        <>
            <form onSubmit={handleLogin} className="space-y-4">

                {error && (
                    <div className="bg-red-100 text-red-700 p-3 rounded-lg text-sm">
                        {error}
                    </div>
                )}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Username
                    </label>
                    <input
                        type="text"
                        value={form.username}
                        onChange={(e) => setForm({ ...form, username: e.target.value })}
                        className="w-full border p-2 rounded"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Password
                    </label>
                    <input
                        type="password"
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                        className="w-full border p-2 rounded"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white p-2 rounded font-semibold hover:bg-blue-700"
                >
                    {submitting ? "Sigining in ..." : "Sign in"}
                </button>
            </form>

        </>

    );
}