"use client";
import { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import dynamic from "next/dynamic";

const VideoComponent = dynamic(() => import("@/Component/Meetings/VideoComponent"), { ssr: false })

export default function Call({
  params,
}: {
  params: { channel: string; token: string };
}) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const timeString = currentTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const [isAudioEnable, setIsAudioEnable] = useState(true);
  const [isVideoEnable, setIsVideoEnable] = useState(true);

  const props = {
    channel: params.channel,
    token: params.token,
    audioEnable: isAudioEnable,
    videoEnable: isVideoEnable,
  };

  const toggleAudio = () => {
    setIsAudioEnable(!isAudioEnable);
  };

  const toggleVideo = () => {
    setIsVideoEnable(!isVideoEnable);
  };

  return (
    <main className="h-screen flex flex-col justify-between py-4">
      <nav className=" p-2 flex justify-between items-center">
        <span className="flex gap-2">
          <img src="/logo.png" alt="logo" width={32} height={32} />
          <h1 className="text-2xl font-bold text-white">IntelliStream</h1>
        </span>
        <span>
          <img src="/recording.png" alt="logo" />
        </span>
      </nav>
      <VideoComponent params={props} />
      <footer className=" flex justify-between px-6">
        <div className="flex gap-2 items-center max-sm:hidden">
          <h2 className="text-white text-2xl">{timeString}</h2>
          <Separator orientation="vertical" />
          <h2 className="text-white text-2xl">{params.channel}</h2>
        </div>
        <div className="flex gap-2">
          <button className="p-2 footer-button " onClick={() => toggleAudio}>
            <img src="/footer/mic-on.png"></img>
          </button>
          <button className="p-2 footer-button" onClick={() => toggleVideo}>
            <img src="/footer/video-on.png"></img>
          </button>
          <button className=" p-2 bg-red-800 footer-button">
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
