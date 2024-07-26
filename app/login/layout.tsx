// login/layout.tsx
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Loader from "@/components/Loader/Loader";

const LoginLayout = ({ children }: { children: React.ReactNode }) => {
    const { status } = useSession();
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (status === "authenticated") {
            router.push('/');
        } else {
            setLoading(false);
        }
    }, [status, router]);

    if (loading) {
        return <Loader />; 
    }

    return (
        <div>
            {children} 
        </div>
    );
};

export default LoginLayout;
