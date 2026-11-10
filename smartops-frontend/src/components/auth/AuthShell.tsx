import { ReactNode } from 'react';

interface Props {
    title: string;
    description: string;
    children: ReactNode;
}

export default function AuthShell({ title, description, children }: Props) {
    return (
        <main className="page-fade flex min-h-screen items-center justify-center bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
            <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5 lg:grid-cols-[0.9fr_1.1fr]">
                <aside className="relative hidden flex-col justify-between overflow-hidden bg-slate-950 p-10 text-white lg:flex">
                    <div className="absolute -right-24 -top-20 h-72 w-72 rounded-full bg-blue-500/25 blur-3xl" />
                    <div className="absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-cyan-400/15 blur-3xl" />
                    <div className="relative">
                        <div className="flex items-center gap-3">
                            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-500 text-lg font-bold shadow-lg shadow-blue-950/30">
                                S
                            </span>
                            <span className="text-lg font-semibold tracking-tight">SmartOps</span>
                        </div>
                        <div className="mt-24 max-w-sm">
                            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-300">
                                IT Asset Management
                            </p>
                            <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-tight">
                                Manage your assets<br />with confidence
                            </h1>
                            <p className="mt-4 text-sm leading-6 text-slate-300">
                                Simplify IT asset management, from keeping inventory to tracking asset status.
                            </p>
                        </div>
                    </div>
                    <div className="relative rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                        <div className="flex items-center justify-between text-xs text-slate-300">
                            <span>Workspace status</span>
                            <span className="flex items-center gap-2 text-emerald-300">
                                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                                Ready
                            </span>
                        </div>
                        <div className="mt-4 grid grid-cols-3 gap-2">
                            <div className="h-1.5 rounded-full bg-blue-400" />
                            <div className="h-1.5 rounded-full bg-cyan-300/70" />
                            <div className="h-1.5 rounded-full bg-white/15" />
                        </div>
                    </div>
                </aside>

                <section className="px-6 py-8 sm:px-10 sm:py-12 lg:px-12">
                    <div className="mx-auto w-full max-w-md">
                        <div className="mb-8 lg:hidden">
                            <div className="flex items-center gap-3">
                                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 font-bold text-white">S</span>
                                <span className="font-semibold tracking-tight text-slate-900">SmartOps</span>
                            </div>
                        </div>
                        <div className="mb-7">
                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
                                SmartOps workspace
                            </p>
                            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                                {title}
                            </h2>
                            <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
                        </div>
                        {children}
                    </div>
                </section>
            </div>
        </main>
    );
}
