'use client';

import { authApi } from "@/src/lib/api";
import { getErrorMessage } from "@/src/lib/errors";
import { Gender, RegisterInput } from "@/src/types/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterForm() {
    const router = useRouter();
    const [form, setForm] = useState<RegisterInput>({
        username: "",
        password: "",
        email: "",
        gender: '' as Gender,
        firstname: "",
        surname: "",
        contact: ""
    });
    const [confirm, setConfirm] = useState("");
    const [loading, setLoading] = useState<boolean>(false);

    const [error, setError] = useState<string | null>(null);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        // 1. เช็ครหัสผ่านให้ตรงกันก่อน (และต้องมี return เพื่อหยุดการทำงาน)
        if (form.password !== confirm) {
            setError('รหัสผ่านไม่ตรงกัน โปรดลองใหม่อีกครั้ง');
            return;
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
                <div className="bg-red-100 text-red-700 p-3 rounded-lg text-sm">
                    {error}
                </div>
            )}

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                <input
                    type="text"
                    value={form.username}
                    onChange={(e) => setForm({ ...form, username: e.target.value })}
                    className="w-full border border-gray-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <input
                        type="password"
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                        className="w-full border border-gray-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                    <input
                        type="password"
                        value={confirm}
                        onChange={(e) => setConfirm(e.target.value)}
                        className="w-full border border-gray-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Firstname</label>
                    <input
                        type="text"
                        value={form.firstname}
                        onChange={(e) => setForm({ ...form, firstname: e.target.value })}
                        className="w-full border border-gray-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Surname</label>
                    <input
                        type="text"
                        value={form.surname}
                        onChange={(e) => setForm({ ...form, surname: e.target.value })}
                        className="w-full border border-gray-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full border border-gray-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
            </div>

            <div>
                <p className="block text-sm font-medium text-gray-700 mb-2">เพศ</p>
                <div className="flex gap-6 text-sm text-gray-700">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="radio"
                            name="gender"
                            checked={form.gender === 'MALE'}
                            onChange={() => setForm({ ...form, gender: 'MALE' })}
                            className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                        />
                        ชาย
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="radio"
                            name="gender"
                            checked={form.gender === 'FEMALE'}
                            onChange={() => setForm({ ...form, gender: 'FEMALE' })}
                            className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                        />
                        หญิง
                    </label>
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact</label>
                <input
                    type="text"
                    value={form.contact}
                    onChange={(e) => setForm({ ...form, contact: e.target.value })}
                    className="w-full border border-gray-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white p-2.5 rounded-lg font-semibold hover:bg-blue-700 transition duration-200 disabled:bg-blue-300 mt-2"
            >
                {loading ? "Registering..." : "Register"}
            </button>

            <div className="text-center text-sm text-gray-600 mt-4">
                มีบัญชีอยู่แล้วใช่ไหม?{' '}
                <Link href="/" className="text-blue-600 font-semibold hover:underline">
                    เข้าสู่ระบบ (Sign in)
                </Link>
            </div>
        </form>
    );
}