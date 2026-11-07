import Link from "next/link";
import LoginForm from "../components/auth/LoginForm";
import RequireAuth from "../components/auth/RequireAuth";
import AssetPage from "./assets/page";

export default function Page() {
  return (
    <RequireAuth>
      <AssetPage />
    </RequireAuth>);
}