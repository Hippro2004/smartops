import Link from "next/link";
import LoginForm from "../components/auth/LoginForm";
import RequireAuth from "../components/auth/RequireAuth";
import AssetPage from "./(main)/assets/page";
import DashboardPage from "./(main)/dashboard/page";
import { redirect } from "next/navigation";

export default function Page() {
  return (
    redirect("/dashboard"))
}