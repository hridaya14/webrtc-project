"use client";
import { account, avatars } from "@/appwrite/config";
import Image from "next/image";
import { useEffect, useState } from "react";
import UserProfile from "./UserProfile";

const Navbar = () => {
    const [avatar , setAvatar] = useState<string>("")
    const [email , setEmail] = useState<string>("")
    useEffect(() => {
        const url = avatars.getInitials().toString()
        setAvatar(url)
        account.get().then((user) => setEmail(user.email))
    }, [])
  return (
    <div className=" text-white bg-[#1C1F2E] p-4 w-full flex justify-between items-center h-24">
      <span>
        <Image
          src="/logo-no-background.svg"
          alt="Logo"
          width={180}
          height={80}
        ></Image>
      </span>
      <span>
        <UserProfile avatar={avatar} email = {email}></UserProfile>
      </span>
    </div>
  );
};
export default Navbar;
