'use client';

import { getErrorMessage } from "@/src/lib/common/exceptions/errors";
import { validateRegister } from "@/src/lib/common/validate/validator";
import { authApi } from "@/src/lib/core/api";
import { RegisterInput } from "@/src/types/auth";
import ProgressLink from "@/src/components/ui/ProgressLink";
import { useRouter } from "next/navigation";
import { useState } from "react";
import LoadingButton from "../ui/LoadingButton";

export default function RegisterForm() {
    const router = useRouter();
    const [form, setForm] = useState<RegisterInput>({
        username: "",
        password: "",
        email: "",
        gender: null,
        firstname: "",
        surname: "",
        contact: ""
    });
    const [confirm, setConfirm] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const [error, setError] = useState<string | null>(null);



    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        const message = validateRegister(form, confirm);
        if (message) {
            setError(message);
            return
        }

        setLoading(true);
        try {
            await authApi.register(form);
            router.push("/");


        } catch (err) {
            setError(getErrorMessage(err));

        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleRegister} className="space-y-4">
            {error && (
                <div role="alert" className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                    {error}
                </div>
            )}

            <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Username</label>
                <input
                    type="text"
                    value={form.username}
                    onChange={(e) => setForm({ ...form, username: e.target.value.trim() })}
                    autoComplete="username"
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">Password</label>
                    <input
                        type="password"
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value.trim() })}
                        autoComplete="new-password"
                        className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                    />
                </div>
                <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">Confirm Password</label>
                    <input
                        type="password"
                        value={confirm}
                        onChange={(e) => setConfirm(e.target.value.trim())}
                        autoComplete="new-password"
                        className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">Firstname</label>
                    <input
                        type="text"
                        value={form.firstname}
                        onChange={(e) => setForm({ ...form, firstname: e.target.value.trim() })}
                        className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                    />
                </div>
                <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">Surname</label>
                    <input
                        type="text"
                        value={form.surname}
                        onChange={(e) => setForm({ ...form, surname: e.target.value.trim() })}
                        className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                    />
                </div>
            </div>

            <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Email</label>
                <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value.trim() })}
                    autoComplete="email"
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                />
            </div>

            <div>
                <p className="mb-2 block text-sm font-medium text-slate-700">เพศ</p>
                <div className="flex gap-6 text-sm text-slate-600">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="radio"
                            name="gender"
                            checked={form.gender === 'MALE'}
                            onChange={() => setForm({ ...form, gender: 'MALE' })}
                            className="h-4 w-4 accent-blue-600 focus:ring-blue-500"
                        />
                        ชาย
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="radio"
                            name="gender"
                            checked={form.gender === 'FEMALE'}
                            onChange={() => setForm({ ...form, gender: 'FEMALE' })}
                            className="h-4 w-4 accent-blue-600 focus:ring-blue-500"
                        />
                        หญิง
                    </label>
                </div>
            </div>

            <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Contact</label>
                <input
                    type="text"
                    value={form.contact}
                    onChange={(e) => setForm({ ...form, contact: e.target.value })}
                    autoComplete="tel"
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                />
            </div>

            <LoadingButton
                type="submit"
                loading={loading}
                loadingText="กำลังสมัคร..."
                className="mt-2 w-full rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-blue-600/20 transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/20"
            >
                Register
            </LoadingButton>

            <div className="mt-5 border-t border-slate-100 pt-5 text-center text-sm text-slate-500">
                มีบัญชีอยู่แล้วใช่ไหม?{' '}
                <ProgressLink href="/login" className="font-semibold text-blue-700 hover:text-blue-800 hover:underline">
                    เข้าสู่ระบบ (Sign in)
                </ProgressLink>
            </div>
        </form>
    );
}