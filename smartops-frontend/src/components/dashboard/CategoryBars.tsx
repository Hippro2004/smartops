import { CategoryCount } from "@/src/types/assets/dashboard";

export default function CategoryBars({ data }: { data: CategoryCount[] }) {
    const max = Math.max(...data.map((d) => d.count), 1);

    return (
        <div className="space-y-5">
            {data.map((item) => (
                <div key={item.category}>
                    <div className="mb-2 flex items-center justify-between text-sm">
                        <span className="font-medium text-slate-700">{item.category}</span>
                        <span className="font-semibold tabular-nums text-slate-900">{item.count.toLocaleString()}</span>
                    </div>
                    <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                        <div
                            className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 transition-[width] duration-500"
                            style={{ width: `${(item.count / max) * 100}%` }}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}