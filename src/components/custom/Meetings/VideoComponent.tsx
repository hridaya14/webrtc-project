"use client";
import { config } from "@/conf/config";
import {
    LocalVideoTrack,
    RemoteUser,
    RemoteVideoTrack,
    ClientRole,  
    useJoin,
    useLocalCameraTrack,
    useLocalMicrophoneTrack,
    usePublish,
    useRemoteUsers,
    IAgoraRTCRemoteUser,
    useRemoteAudioTracks,
    LocalUser,
} from "agora-rtc-react";
import { useEffect, useState } from "react";
import { Loading } from "../Loading";

export default function VideoComponent(props : {channel : string , token : string , uid : string ,  audioEnable : boolean , videoEnable : boolean}) {

    const { isLoading: isLoadingMic, localMicrophoneTrack } = useLocalMicrophoneTrack();
    const { isLoading: isLoadingCam, localCameraTrack } = useLocalCameraTrack();
    const remoteUsers = useRemoteUsers();
    const { audioTracks } = useRemoteAudioTracks(remoteUsers);
    audioTracks.map((track) => track.play());

    const [gridView, setGridView] = useState(true); 


    useEffect(() => {
        if (props.audioEnable) {
            localMicrophoneTrack?.setEnabled(true);
        } else {
            localMicrophoneTrack?.setEnabled(false);
        }
        if (props.videoEnable) {
            localCameraTrack?.setEnabled(true);
        } else {
            localCameraTrack?.setEnabled(false);
        }
    }, [props.audioEnable, props.videoEnable]);

    useEffect(() => {
        return () => {
            localCameraTrack?.close();
            localMicrophoneTrack?.close();
        };
    }, []);

    
    useJoin({
        appid: config.App_ID,
        channel: props.channel,
        token: props.token,
        uid : props.uid
    });

    usePublish([localMicrophoneTrack, localCameraTrack]);
    
   

    if (isLoadingMic || isLoadingCam) {
        return <Loading />;
    }

    if(remoteUsers.length == 0){
        return(
            <div className=" max-sm:h-[32rem] h-full w-full rounded-xl py-4 mx-auto max-w-3xl ">
                <LocalVideoTrack track={localCameraTrack} play = {true}  />
            </div>
        )
    }

    return (
        <div className="h-full relative">
            <div className="absolute top-4 right-4 z-20">
                <button onClick={() => setGridView(!gridView)}>Toggle View</button>
            </div>
            <div className="grid gap-1 flex-1 mx-auto" style={{
                gridTemplateColumns: gridView ? `repeat(3, minmax(0, 1fr))` : `minmax(0, 1fr)`,
            }}>
                {remoteUsers.map((remoteUser, index) => (
                    <div className="vid rounded-lg relative" style={{ height: 400, width: 600 }} key={remoteUser.uid}>
                        <RemoteUser user={remoteUser} playVideo={true} playAudio={true} />
                        <div className="absolute bottom-4 right-4 z-20 text-white">{remoteUser.uid}</div>
                    </div>
                ))}
                <div className="vid rounded-lg " style={{ height: 400, width: 600 }}>
                    <LocalVideoTrack track={localCameraTrack} play={true} className="h-full w-full rounded-xl absolute bottom-4 right-4" />
                    <div className="absolute bottom-4 right-4 z-20 text-white">{props.uid}</div>
                </div>
            </div>
        </div>
    );
}
    
