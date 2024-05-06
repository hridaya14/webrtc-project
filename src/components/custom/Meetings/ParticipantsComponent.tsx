import { avatars } from "@/appwrite/config"
import { useRemoteUsers } from "agora-rtc-react";
export default function ParticipantsComponent({uid} : {uid : string}){
    const remoteUsers = useRemoteUsers();
    const generateAvatar = (name : string) => {
        return avatars.getInitials(name);
    }
    
    return(
        <div className="h-[90%] z-50 max-w-md w-full absolute max-sm:right-0 max-sm:bottom-4 bottom-2 right-8 toggle-box p-3">
            <h2 className="text-2xl text-white">People</h2>
            <ul className="flex flex-col gap-4 py-6 overflow-y-scroll">
                <li className="flex gap-2 text-white">
                    <span><img src = {`${generateAvatar(uid)}`} className=" h-8 w-8 rounded-full"></img></span>
                    <span className="text-lg"> {uid}(You)</span>
                </li>
                {remoteUsers.map((user) => {
                    return (
                        <li className="flex gap-2 text-white">
                            <span><img src = {`${generateAvatar(String(user.uid))}`} className=" h-8 w-8 rounded-full"></img></span>
                            <span className="text-lg">{user.uid}</span>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}