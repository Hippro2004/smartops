import Link from 'next/link';

const CARDS = [
    { href: '/assets', title: 'Assets', desc: 'จัดการอุปกรณ์ IT' },
    // เพิ่มการ์ดเมนูอื่นตรงนี้
];

export default function DashboardPage() {
    return (
        <div className="space-y-8">
            <header>
                <p className="text-sm font-medium text-blue-700">Workspace</p>
                <h1 className="mt-1 text-3xl font-semibold tracking-tight text-slate-900">Dashboard</h1>
                <p className="mt-2 text-sm text-slate-500">ภาพรวมการจัดการทรัพย์สิน IT ของคุณ</p>
            </header>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                {CARDS.map((card) => (
                    <Link
                        key={card.href}
                        href={card.href}
                        className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-900/[0.02] transition duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-900/[0.06]"
                    >
                        <div className="flex items-start justify-between">
                            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700 transition group-hover:bg-blue-600 group-hover:text-white">
                                <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
                                    <rect x="4" y="5" width="16" height="14" rx="2" stroke="currentColor" strokeWidth="1.7" />
                                    <path d="M8 9h8M8 12h5m-5 3h8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                                </svg>
                            </span>
                            <span className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-blue-600" aria-hidden="true">→</span>
                        </div>
                        <h2 className="mt-5 text-lg font-semibold text-slate-900">{card.title}</h2>
                        <p className="mt-1 text-sm leading-6 text-slate-500">{card.desc}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}