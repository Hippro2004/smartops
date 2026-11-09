import { CategoryCount } from "@/src/types/assets/dashboard";

export default function CategoryBars({ data }: { data: CategoryCount[] }) {
    const max = Math.max(...data.map((d) => d.count), 1);

    return (
        <div className="space-y-3">
            {data.map((item) => (
                <div key={item.category}>
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>{item.category}</span>
                        <span>{item.count}</span>
                    </div>
                    <div className="h-3 bg-gray-100 rounded">
                        <div
                            className="h-3 bg-blue-600 rounded"
                            style={{ width: `${(item.count / max) * 100}%` }}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}