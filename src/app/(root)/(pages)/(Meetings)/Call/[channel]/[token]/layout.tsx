"use client";
import AgoraRTC, {
  AgoraRTCProvider,
  RemoteUser,
  useRTCClient,
} from "agora-rtc-react";

const CallLayout = ({ children }: { children: React.ReactNode }) => {
  const client = useRTCClient(
    AgoraRTC.createClient({ codec: "vp8", mode: "rtc" })
  );

  return (
    <main className=" h-screen bg-black ">
      <AgoraRTCProvider client={client}>{children}</AgoraRTCProvider>
    </main>
  );
};

export default CallLayout;
