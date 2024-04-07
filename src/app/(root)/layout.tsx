"use client";
import { AuthProvider } from "@/context/authContext";
import React, { useEffect, useState } from "react";
import { account } from  "@/appwrite/config";
import { Loading } from "@/Component/Loading";

const ProtectedLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [authStatus, setAuthStatus] = useState(false);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    account
      .get()
      .then(() => setAuthStatus(true))
      .catch(() => setAuthStatus(false))
      .finally(() => setLoader(false));
  }, []);

  return (
    <AuthProvider value={{ authStatus, setAuthStatus }}>
      {loader ? (
        <Loading />
      ) : (
        <>{children}</>
      )}
    </AuthProvider>
  );
};

export default ProtectedLayout;
