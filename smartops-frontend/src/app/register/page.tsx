import RegisterForm from "@/src/components/auth/RegisterForm";
import Link from "next/link";

export default function RegisterPage() {
    return (<>
        <main>
            <div>
                <h1>Create Account</h1>
                <p>SmartOps IT Asset Management</p>
                <RegisterForm />
                <p>มีบัญชีอยู่แล้ว? {' '}
                    <Link href={"/"}>เข้าสู่ระบบ</Link >
                </p>

            </div>
        </main>
    </>)
}