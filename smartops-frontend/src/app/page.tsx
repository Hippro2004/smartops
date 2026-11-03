import Link from "next/link";
import LoginForm from "../components/auth/LoginForm";

export default function Home() {
  return (<main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
    <div className="w-full max-w-sm bg-white p-8 rounded-xl shadow-sm">
      <h1 className="text-2xl font-bold text-gray-800 mb-1">SmartOps</h1>
      <p className="text-gray-500 mb-6">IT Asset Management</p>
      <LoginForm />
      <p>ยังไม่มีบัญชี? {' '}
        <Link href={"/register"}>สมัครสมาชิก</Link>
      </p>
    </div>
  </main>);
}