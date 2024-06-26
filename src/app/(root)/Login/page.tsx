"use client";
import useAuth from "@/context/useAuth";
import { useRouter } from "next/navigation";
import React from "react";
import Login from "@/components/custom/Login/Login";

const LoginPage = () => {
    const router = useRouter();
    const { authStatus } = useAuth();

    if (authStatus) {
        router.replace("/Home");
        return <></>;
    }

    return(
        <>
            <Login/>
        </>
    )
}


export default LoginPage;