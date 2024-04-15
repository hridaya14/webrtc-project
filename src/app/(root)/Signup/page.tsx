"use client";
import useAuth from "@/context/useAuth";
import { useRouter } from "next/navigation";
import React from "react";
import Signup from "@/components/custom/Signup/Signup";

const SignupPage = () => {
    const router = useRouter();
    const { authStatus } = useAuth();

    if (authStatus) {
        router.replace("/Home");
        return <></>;
    }

    return(
        <>
            <Signup/>
        </>
    )
}

export default SignupPage;