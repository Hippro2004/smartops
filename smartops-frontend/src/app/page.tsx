import Link from "next/link";
import LoginForm from "../components/auth/LoginForm";
import RequireAuth from "../components/auth/RequireAuth";
import AssetPage from "./(main)/assets/page";
import DashboardPage from "./(main)/dashboard/page";

export default function Page() {
  return (
    <RequireAuth>
      <DashboardPage />
    </RequireAuth>);
}