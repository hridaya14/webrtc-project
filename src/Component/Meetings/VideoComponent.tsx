"use client";
import { config } from "@/conf/config";
import {
    LocalVideoTrack,
    RemoteUser,
    RemoteVideoTrack,
    useJoin,
    useLocalCameraTrack,
    useLocalMicrophoneTrack,
    usePublish,
    useRemoteUsers,
} from "agora-rtc-react";

export default function VideoComponent({params} : {params : {channel : string , token : string , audioEnable : boolean , videoEnable : boolean}}) {

    const { isLoading: isLoadingMic, localMicrophoneTrack } = useLocalMicrophoneTrack();
    const { isLoading: isLoadingCam, localCameraTrack } = useLocalCameraTrack();

    

    if (localMicrophoneTrack && !params.audioEnable) {
        localMicrophoneTrack.setMuted(false);
    }

    if (localCameraTrack && !params.videoEnable) {
        localCameraTrack.setMuted(false);
    }

    
    useJoin({
        appid: config.App_ID,
        channel: params.channel,
        token: params.token,
    });

    usePublish([localMicrophoneTrack, localCameraTrack]);
    
    

    if (isLoadingMic || isLoadingCam) {
        return <div>Loading...</div>;
    }

    return (
        <div className=" h-full flex justify-center">
            
        </div>
    );
}
