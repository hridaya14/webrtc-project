"use client";
import { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import dynamic from "next/dynamic";
import {memo} from "react"
import { account} from "@/appwrite/config";
import axios from "axios";
import { Loading } from "@/components/custom/Loading";
import { Models } from "appwrite";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
const VideoComponent = dynamic(() => import("@/components/custom/Meetings/VideoComponent"),{ssr:false});
const ChatComponent = dynamic(() => import("@/components/custom/Meetings/ChatComponent"),{ssr:false});
const ParticipantsComponent = dynamic(() => import("@/components/custom/Meetings/ParticipantsComponent"),{ssr:false});
import { isAdmin } from "@/atoms/admin";
import { useRecoilValue } from "recoil";
import { config } from "@/conf/config";
import Pubnub from "pubnub";


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
  const [isChatOpen,setIsChatOpen] = useState(false);
  const [isParticipants,setIsParticipants] = useState(false);
  const isHost = useRecoilValue(isAdmin);
  const [messages, setMessages] = useState<any[]>([]); 
  const [session, setSession] = useState<Pubnub | null>(null); // Initialize session as null

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
    };

    fetchToken();
  }, []);

  useEffect(() => {
    if (user.$id) {
      const newSession = new Pubnub({ 
        publishKey: config.PUBLISH_KEY,
        subscribeKey: config.SUBSCRIBE_KEY,
        userId: user.$id,
      });
      setSession(newSession);
    }
  }, [user.$id]);

  useEffect(() => {
    if (session) { 
      session.subscribe({ channels: [params.channel] });

      const handleMessage = (event: any) => {
        setMessages((msgs) => [...msgs, event.message]); 
      };

      session.addListener({
        message: handleMessage,
      });

      return () => {
        session.unsubscribeAll();
      };
    }
  }, [session, params.channel]);

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

  const handleChat = () =>  {
    if (isParticipants){
      setIsParticipants(false);
    }
    setIsChatOpen(!isChatOpen);
  };

  const handleExit = () => {
    router.push("/");
  };

  const handleParticipants = () =>  {
    if (isChatOpen){
      setIsChatOpen(false);
    }
    setIsParticipants(!isParticipants);
  };

  if(loading){
    return <Loading/>
  }

  if(!token || !user || !params.channel){
    return <div>Something went wrong</div>
  }

  return (
    <main className="h-full flex flex-col justify-between py-4 max-sm:py-2">
      <nav className="p-2 flex justify-between items-center">
        <span className="flex gap-2">
          <img src="/logo.png" alt="logo" width={32} height={32} />
          <h1 className="text-2xl font-bold text-white">IntelliStream</h1>
        </span>
        <span>
          <img src="/recording.png" alt="logo" />
        </span>
      </nav>
      <section className="size-full relative py-4">
        <VideoComponent channel={params.channel} token={token} uid={user.name} audioEnable={isAudioEnable}  videoEnable={isVideoEnable} />
        {isChatOpen ? <ChatComponent uid={user.$id} channel={params.channel} name={user.name} messages={messages} pubnub={session!} /> : null}
        {isParticipants ? <ParticipantsComponent uid={user.name} /> : null}
      </section>
      
      <footer className="flex justify-between px-6">
        <span className="flex gap-2 py-2 items-center max-sm:hidden">
          <h2 className="text-white text-xl">{timeString}</h2>
          <Separator orientation="vertical" />
          <h2 className="text-white text-xl">{params.channel}</h2>
        </span>
        <div className="flex gap-2 md:pr-8">
          <button className={cn("p-2 footer-button",{"footer-off" : !isAudioEnable})} onClick={toggleAudio}>
            <img src={isAudioEnable ? "/footer/mic-on.png" : "/footer/mic-off.png"} alt="mic"></img>
          </button>
          <button className={cn("p-2 footer-button",{"footer-off" : !isVideoEnable})} onClick={toggleVideo}>
            <img src={isVideoEnable ? "/footer/video-on.png" : "/footer/video-off.png"} alt="video"></img>
          </button>
          <button className="p-2 bg-red-800 footer-button" onClick={handleExit}>
            <img src="/footer/exit.png" alt="exit"></img>
          </button>
        </div>
        <div className="flex gap-2">
          <button className="p-2 footer-button " onClick={handleChat}>
            <img src="/footer/chat.png" alt="chat"></img>
          </button>
          <button className="p-2 footer-button" onClick={handleParticipants}>
            <img src="/footer/participants.png" alt="participants"></img>
          </button>
        </div>
      </footer>
    </main>
  );
}
