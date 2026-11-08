import Navbar from '@/src/components/layout/Navbar';
import Link from 'next/link';

const CARDS = [
    { href: '/assets', title: 'Assets', desc: 'จัดการอุปกรณ์ IT' },
    // เพิ่มการ์ดเมนูอื่นตรงนี้
];

export default function DashboardPage() {
    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {CARDS.map((card) => (
                    <Link
                        key={card.href}
                        href={card.href}
                        className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition"
                    >
                        <h2 className="text-lg font-semibold text-gray-800">{card.title}</h2>
                        <p className="text-sm text-gray-500 mt-1">{card.desc}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}