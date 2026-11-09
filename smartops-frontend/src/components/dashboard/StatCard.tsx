interface StatCardProps {
    label: string;
    value: number;
    color?: string;
}

export default function StatCard({
    label,
    value,
    color = 'text-gray-800',
}: StatCardProps) {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm">
            <p className="text-sm text-gray-500">{label}</p>
            <p className={`text-3xl font-bold mt-1 ${color}`}>{value}</p>
        </div>
    );
}