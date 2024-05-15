"use client";
import { Providers } from "@/app/providers"
import { Loading } from "@/components/custom/Loading";
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
        return <Loading/>;
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