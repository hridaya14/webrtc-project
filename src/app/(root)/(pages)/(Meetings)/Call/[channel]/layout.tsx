"use client";
import AgoraRTC, {
  AgoraRTCProvider,
  useRTCClient,
  
} from "agora-rtc-react";



const CallLayout = ({ children }: { children: React.ReactNode }) => {
  const client = useRTCClient(
    AgoraRTC.createClient({ codec: "vp8", mode: "rtc"  })
  );
  


  return (
    <main className=" h-screen overflow-hidden bg-black ">
      <AgoraRTCProvider client={client}>{children}</AgoraRTCProvider>
    </main>
  );
};

export default CallLayout;
