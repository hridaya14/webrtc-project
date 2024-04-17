"use client";
import { redirect } from 'next/navigation';
import useAuth from "@/context/useAuth"


export default function Main () {
    const { authStatus } = useAuth();
    if (!authStatus) {
        redirect("/Login");
    }
    redirect("/Home");
    
    
}

