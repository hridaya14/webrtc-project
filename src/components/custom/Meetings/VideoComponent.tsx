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
import { useEffect } from "react";

export default function VideoComponent(props : {channel : string , token : string , uid : string ,  audioEnable : boolean , videoEnable : boolean}) {

    const { isLoading: isLoadingMic, localMicrophoneTrack } = useLocalMicrophoneTrack();
    const { isLoading: isLoadingCam, localCameraTrack } = useLocalCameraTrack();
    const remoteUsers = useRemoteUsers();
    const { audioTracks } = useRemoteAudioTracks(remoteUsers);
    audioTracks.map((track) => track.play());

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
        return <div>Loading...</div>;
    }

    if(remoteUsers.length == 0){
        return(
            <div className=" max-sm:h-[32rem] h-full w-full rounded-xl py-4 justify-center flex ">
                <LocalVideoTrack track={localCameraTrack} play = {true} className="max-w-3xl h-full rounded-xl" />
            </div>
        )
    }


    const unit = "minmax(0, 1fr)";
    


    return(
        <div className=" h-full relative">
            <div className="h-52 w-52 absolute bottom-4 right-4">
                <LocalVideoTrack track={localCameraTrack} play = {true}/>
                <h3 className="text-white">{props.uid}</h3>
            </div>
        
        <div className={`grid  gap-1 flex-1`} style={{
            gridTemplateColumns:
                remoteUsers.length > 9
                ? unit.repeat(4)
                : remoteUsers.length > 4
                ? unit.repeat(3)
                : remoteUsers.length > 1
                ? unit.repeat(2)
                : unit,
        }}>
            {remoteUsers.map((remoteUser) => (
                    <div className="vid rounded-lg" style={{ height: 400, width: 600 }} key={remoteUser.uid}>
                        <RemoteUser user={remoteUser} playVideo={true} playAudio={true} />
                        <div className="text-white">{remoteUser.uid}</div>
                    </div>
                ))}
           </div>
            
        </div>
    )
    
}
