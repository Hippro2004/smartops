interface StatCardProps {
    label: string;
    value: number;
    color?: string;
    accent?: string;
}

export default function StatCard({
    label,
    value,
    color = 'text-slate-900',
    accent = 'bg-blue-500',
}: StatCardProps) {
    return (
        <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-900/[0.02] sm:p-6">
            <span className={`absolute inset-y-0 left-0 w-1 ${accent}`} />
            <p className="text-sm font-medium text-slate-500">{label}</p>
            <p className={`mt-3 text-3xl font-semibold tracking-tight sm:text-4xl ${color}`}>{value.toLocaleString()}</p>
            <p className="mt-2 text-xs text-slate-400">Current system total</p>
        </div>
    );
}