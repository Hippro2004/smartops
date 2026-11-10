import RegisterForm from '@/src/components/auth/RegisterForm';
import AuthShell from '@/src/components/auth/AuthShell';

export default function RegisterPage() {
    return (
        <AuthShell title="Create an account" description="Enter your details to get started with SmartOps and manage your team's IT assets.">
            <RegisterForm />
        </AuthShell>
    );
}