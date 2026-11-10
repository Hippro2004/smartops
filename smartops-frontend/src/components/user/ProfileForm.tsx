'use client';

import { useAuth } from '@/src/components/auth/AuthProvider';
import LoadingButton from '@/src/components/ui/LoadingButton';
import { getErrorMessage } from '@/src/lib/common/exceptions/errors';
import { validateUpdate } from '@/src/lib/common/validate/validator';
import { userApi } from '@/src/lib/core/api';
import { Gender } from '@/src/types/auth';
import { UpdateProfileRequest } from '@/src/types/users/user';
import { useState } from 'react';

const EMPTY_FORM: UpdateProfileRequest = {
    firstname: '',
    surname: '',
    gender: '' as Gender,
    contact: '',
    currentPassword: '',
    newPassword: '',
};

const inputClassName = 'w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10';

export default function ProfileForm() {
    const { me, refreshMe } = useAuth();
    const [form, setForm] = useState<UpdateProfileRequest>(() => me ? {
        firstname: me.firstname ?? '',
        surname: me.surname ?? '',
        gender: me.gender ?? '',
        contact: me.contact ?? '',
        currentPassword: '',
        newPassword: '',
    } : EMPTY_FORM);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [confirm, setConfirm] = useState<string>("");

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);
        setSuccess(null);

        const message = validateUpdate(form, confirm)
        if (message) {
            setError(message);
            return;
        }
        setLoading(true);
        try {
            await userApi.updateProfile(form);
            await refreshMe();
            setForm((current) => ({ ...current, currentPassword: '', newPassword: '' }));
            setConfirm('');
            setSuccess('Your personal information has been saved.');
        } catch (submitError) {
            setError(getErrorMessage(submitError));
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
                <div role="alert" className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                    {error}
                </div>
            )}
            {success && (
                <div role="status" className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                    {success}
                </div>
            )}

            <section aria-labelledby="account-information" className="space-y-4">
                <div>
                    <h2 id="account-information" className="text-base font-semibold text-slate-900">Account information</h2>
                    <p className="mt-1 text-sm text-slate-500">These details identify your account in the system.</p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                        <label htmlFor="profile-username" className="mb-1.5 block text-sm font-medium text-slate-700">Username</label>
                        <input id="profile-username" value={me?.username ?? ''} readOnly className={`${inputClassName} bg-slate-50 text-slate-500`} />
                    </div>
                    <div>
                        <label htmlFor="profile-email" className="mb-1.5 block text-sm font-medium text-slate-700">Email</label>
                        <input id="profile-email" type="email" value={me?.email ?? ''} readOnly className={`${inputClassName} bg-slate-50 text-slate-500`} />
                    </div>
                </div>
            </section>

            <section aria-labelledby="personal-information" className="space-y-4 border-t border-slate-100 pt-6">
                <div>
                    <h2 id="personal-information" className="text-base font-semibold text-slate-900">Personal information</h2>
                    <p className="mt-1 text-sm text-slate-500">Update your name and contact details.</p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                        <label htmlFor="profile-firstname" className="mb-1.5 block text-sm font-medium text-slate-700">First name</label>
                        <input
                            id="profile-firstname"
                            value={form.firstname}
                            onChange={(event) => setForm({ ...form, firstname: event.target.value })}
                            autoComplete="given-name"
                            maxLength={50}
                            className={inputClassName}
                        />
                    </div>
                    <div>
                        <label htmlFor="profile-surname" className="mb-1.5 block text-sm font-medium text-slate-700">Last name</label>
                        <input
                            id="profile-surname"
                            value={form.surname}
                            onChange={(event) => setForm({ ...form, surname: event.target.value })}
                            autoComplete="family-name"
                            maxLength={50}
                            className={inputClassName}
                        />
                    </div>
                    <div>
                        <label htmlFor="profile-gender" className="mb-1.5 block text-sm font-medium text-slate-700">Gender</label>
                        <select
                            id="profile-gender"
                            value={form.gender}
                            onChange={(event) => setForm({ ...form, gender: event.target.value as Gender })}
                            className={inputClassName}
                        >
                            <option value="UNSPECIFIED">Unspecified</option>
                            <option value="MALE">Male</option>
                            <option value="FEMALE">Female</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="profile-contact" className="mb-1.5 block text-sm font-medium text-slate-700">Phone number</label>
                        <input
                            id="profile-contact"
                            type="tel"
                            inputMode="numeric"
                            value={form.contact}
                            onChange={(event) => setForm({ ...form, contact: event.target.value })}
                            autoComplete="tel"
                            maxLength={10}
                            className={inputClassName}
                        />
                    </div>

                    <div>
                        <label htmlFor="profile-current-password" className="mb-1.5 block text-sm font-medium text-slate-700">Current password</label>
                        <input
                            id="profile-current-password"
                            type="password"
                            value={form.currentPassword}
                            onChange={(event) => setForm({ ...form, currentPassword: event.target.value })}
                            autoComplete="current-password"
                            minLength={8}
                            maxLength={32}
                            required
                            className={inputClassName}
                        />
                    </div>
                    <div>
                        <label htmlFor="profile-new-password" className="mb-1.5 block text-sm font-medium text-slate-700">New password</label>
                        <input
                            id="profile-new-password"
                            type="password"
                            value={form.newPassword}
                            onChange={(event) => setForm({ ...form, newPassword: event.target.value })}
                            autoComplete="new-password"
                            minLength={8}
                            maxLength={32}
                            required
                            className={inputClassName}
                        />
                    </div>
                    <div>
                        <label htmlFor="profile-confirm-password" className="mb-1.5 block text-sm font-medium text-slate-700">Confirm new password</label>
                        <input
                            id="profile-confirm-password"
                            type="password"
                            value={confirm}
                            onChange={(event) => setConfirm(event.target.value)}
                            autoComplete="new-password"
                            minLength={8}
                            maxLength={32}
                            required
                            className={inputClassName}
                        />
                    </div>
                </div>
            </section>

            <div className="flex justify-end border-t border-slate-100 pt-5">
                <LoadingButton
                    type="submit"
                    loading={loading}
                    loadingText="Saving..."
                    className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-blue-600/20 transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/20"
                >
                    Save changes
                </LoadingButton>
            </div>
        </form>
    );
}
