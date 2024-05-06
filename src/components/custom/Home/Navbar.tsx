"use client";
import { account, avatars } from "@/appwrite/config";
import Image from "next/image";
import { useEffect, useState } from "react";
import UserProfile from "./UserProfile";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import Sidebar from "./Sidebar";
import MobileSidebar from "./MobileSidebar";


const Navbar = () => {
    const [avatar , setAvatar] = useState<string>("")
    const [email , setEmail] = useState<string>("")
    const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);

    useEffect(() => {
      const enumerateDevices = async () => {
        const devices = await navigator.mediaDevices.enumerateDevices();
        setDevices(devices);
      };
  
      enumerateDevices();
    }, []);


    useEffect(() => {
        const url = avatars.getInitials().toString()
        setAvatar(url)
        account.get().then((user) => setEmail(user.email))
    }, [])
    
  return (
    <nav className=" text-white z-50 bg-[#1C1F2E] px-6 py-4 w-full flex justify-between items-center fixed">
      <span className="flex">
        <MobileSidebar/>
        <Image
          src="/logo-no-background.svg"
          alt="Logo"
          width={180}
          height={80}
        ></Image>
      </span>
      <span className="flex gap-1">
        <UserProfile avatar={avatar} devices = {devices} email = {email}></UserProfile>
        
      </span>
    </nav>
  );
};
export default Navbar;
