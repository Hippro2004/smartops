import LoginForm from "@/src/components/auth/LoginForm";
import AuthShell from "@/src/components/auth/AuthShell";
import ProgressLink from "@/src/components/ui/ProgressLink";

export default function LoginPage() {
    return (
        <AuthShell title="Welcome back" description="Sign in to manage your workspace and IT assets.">
                <LoginForm />
                <p className="mt-6 border-t border-slate-100 pt-5 text-center text-sm text-slate-500">
                    Don&apos;t have an account?{' '}
                    <ProgressLink
                        href="/register"
                        className="font-semibold text-blue-700 hover:text-blue-800 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                    >
                        Create an account
                    </ProgressLink>
                </p>
        </AuthShell>
    );
}