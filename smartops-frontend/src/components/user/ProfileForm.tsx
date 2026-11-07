import { ProfileResponse } from "@/src/types/user";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProfileForm() {
    const [form, setForm] = useState<ProfileResponse>();

    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");


    const handleProfile = async () => {
        setError("")
        setLoading(true);

        try {

        } catch (error) {

        } finally {
            setLoading(false)
        }
    }

    const updateProfile = async () => {

    }
    return (
        <>
            <form onSubmit={updateProfile} method="post">
            </form>
        </>
    )

}