"use client";
import { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import dynamic from "next/dynamic";
import { account } from "@/appwrite/config";
import axios from "axios";
import { Loading } from "@/components/custom/Loading";
import { Models } from "appwrite";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
const VideoComponent = dynamic(() => import("@/components/custom/Meetings/VideoComponent"),{ssr:false});

export default function Call({
  params,
}: {
  params: { channel: string};
}) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [token,setToken] = useState("");
  const [loading , setLoading] = useState(false);
  const [user , setUser] = useState<Models.Preferences>({});
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);


    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchToken = async () => {
      const user = await account.get();
      if (!user) {
        return;
      }

      setUser(user);

      const data = {
        "channel": params.channel,
        "uid": user.name,
        "expire": 3600
    };

    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    };

    setLoading(true);
    const response = await axios.post('/api/getToken', data, config);


    
    if (response.status === 200) {
        setToken(response.data.token);
      }

    setLoading(false);
    }



    fetchToken();
  
  },[]);

  const timeString = currentTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const [isAudioEnable, setIsAudioEnable] = useState(true);
  const [isVideoEnable, setIsVideoEnable] = useState(true);

  

  const toggleAudio = () => {
    setIsAudioEnable(!isAudioEnable);
  };

  const toggleVideo = () => {
    setIsVideoEnable(!isVideoEnable);
  };

  if(loading){
    return <Loading/>
  }

  if(!token || !user || !params.channel){
    return <div>Something went wrong</div>
  }

  return (
    <main className=" h-full flex flex-col justify-between py-4">
      <nav className=" p-2 flex justify-between items-center">
        <span className="flex gap-2">
          <img src="/logo.png" alt="logo" width={32} height={32} />
          <h1 className="text-2xl font-bold text-white">IntelliStream</h1>
        </span>
        <span>
          <img src="/recording.png" alt="logo" />
        </span>
      </nav>
      <VideoComponent channel = {params.channel} token = {token} uid = {user.name} audioEnable = {isAudioEnable}  videoEnable={isVideoEnable} />
      <footer className=" flex justify-between px-6">
        <div className="flex gap-2 items-center max-sm:hidden">
          <h2 className="text-white text-2xl">{timeString}</h2>
          <Separator orientation="vertical" />
          <h2 className="text-white text-2xl">{params.channel}</h2>
        </div>
        <div className="flex gap-2 md:pr-8">
          <button className={cn("p-2 footer-button",{"footer-off" : !isAudioEnable})} onClick={ toggleAudio}>
            <img src={isAudioEnable ? "/footer/mic-on.png" : "/footer/mic-off.png"}></img>
          </button>
          <button className={cn("p-2 footer-button",{"footer-off" : !isVideoEnable})} onClick={ toggleVideo}>
            <img src={isVideoEnable ? "/footer/video-on.png" : "/footer/video-off.png"}></img>
          </button>
          <button className=" p-2 bg-red-800 footer-button" onClick={() => {router.push("/")}}>
            <img src="/footer/exit.png"></img>
          </button>
        </div>
        <div className="flex gap-2">
          <button className="p-2 footer-button ">
            <img src="/footer/chat.png"></img>
          </button>
          <button className="p-2 footer-button">
            <img src="/footer/participants.png"></img>
          </button>
        </div>
      </footer>
    </main>
  );
}
