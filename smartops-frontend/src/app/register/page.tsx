import RegisterForm from '@/src/components/auth/RegisterForm';
import AuthShell from '@/src/components/auth/AuthShell';

export default function RegisterPage() {
    return (
        <AuthShell title="สร้างบัญชีใหม่" description="กรอกข้อมูลเพื่อเริ่มใช้งาน SmartOps และจัดการทรัพย์สิน IT ของทีม">
            <RegisterForm />
        </AuthShell>
    );
}