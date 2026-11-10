'use client';
import { authApi } from '@/src/lib/core/api';
import { LoginInput } from '@/src/types/auth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { isAdmin, useAuth } from './AuthProvider';
import { tokens } from '@/src/lib/auth/auth';
import { getErrorMessage } from '@/src/lib/common/exceptions/errors';
import { vaildateLogin } from '@/src/lib/common/validate/validator';
import LoadingButton from '../ui/LoadingButton';


export default function LoginForm() {
    const router = useRouter();
    const [form, setForm] = useState<LoginInput>({ username: '', password: '' });
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { refreshMe } = useAuth();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        const message = vaildateLogin(form);
        if (message) {
            setError(message)
            return;
        }

        setSubmitting(true)

        try {
            const res = await authApi.login(form);
            // localStorage.setItem('access_token', res.accessToken);
            // localStorage.setItem('refresh_token', res.refreshToken)

            tokens.save(res);
            const me = await refreshMe();
            router.push(isAdmin(me) ? '/admin/dashboard' : "/dashboard");

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
                    <div role="alert" className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                        {error}
                    </div>
                )}
                <div>
                    <label htmlFor="login-username" className="mb-1.5 block text-sm font-medium text-slate-700">
                        Username
                    </label>
                    <input
                        id="login-username"
                        type="text"
                        value={form.username}
                        onChange={(e) => setForm({ ...form, username: e.target.value })}
                        autoComplete="username"
                        className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                    />
                </div>

                <div>
                    <label htmlFor="login-password" className="mb-1.5 block text-sm font-medium text-slate-700">
                        Password
                    </label>
                    <input
                        id="login-password"
                        type="password"
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                        autoComplete="current-password"
                        className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                    />
                </div>

                <LoadingButton
                    type="submit"
                    loading={submitting}
                    loadingText="กำลังเข้าสู่ระบบ..."
                    className="w-full rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-blue-600/20 transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/20"
                >
                    เข้าสู่ระบบ
                </LoadingButton>
            </form>

        </>

    );
}