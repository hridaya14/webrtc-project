"use client";
import MeetingCard from "@/components/custom/Home/MeetingCard";
import {UpcomingMeeting} from "@/components/custom/Home/UpcomingMeeting";
import HomeCard from "@/components/custom/Home/HomeCard";

import { account } from "@/appwrite/config";
import { useEffect, useState } from "react";





export default function Home() {
  const [uid, setuid] = useState<string>("");
  const [loading , setLoading] = useState(true)
  useEffect(() => {
    const fetchUid = async () => {
      const { $id } = await account.get();
      setuid($id)
      setLoading(false)
    }
    fetchUid();
  }, []);
  
  if(loading){
    return <div>Loading...</div>
  }
  return (
    <section className="container my-8 size-full   px-6  flex flex-col max-sm:items-start gap-6 text-white">
      <HomeCard/>
      <section className=" max-xl:flex-col h-full max-xl:w-full max-xl:items-start items-start flex px-2 max-xl:space-y-6">
        <MeetingCard />
        <UpcomingMeeting uid = {uid} />
      </section>
    </section>
  );
}


