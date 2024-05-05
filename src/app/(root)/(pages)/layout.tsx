"use client";
import { Providers } from "@/app/providers"
import useAuth from "@/context/useAuth"
import { useRouter } from "next/navigation"

import React from "react"
import { RecoilRoot } from "recoil";

const ProtectedLayout = ({
    children,
  }: {
    children: React.ReactNode
  }) => {

    const router = useRouter();
    const { authStatus } = useAuth();

    if (!authStatus) {
        router.replace("/Login");
        return <></>;
    }
    return (
        <Providers>
          <RecoilRoot>
            {children}
          </RecoilRoot>
        </Providers>
      
      )

}

export default ProtectedLayout;