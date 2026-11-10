import ProfileForm from '@/src/components/user/ProfileForm';

export default function ProfilePage() {
    return (
        <div className="mx-auto max-w-5xl space-y-7">
            <header>
                <p className="text-sm font-medium text-blue-700">Account</p>
                <h1 className="mt-1 text-3xl font-semibold tracking-tight text-slate-900">Personal information</h1>
                <p className="mt-2 text-sm text-slate-500">Manage your account details and contact information.</p>
            </header>

            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-900/[0.02] sm:p-8">
                <ProfileForm />
            </section>
        </div>
    );
}