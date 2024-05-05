import Pubnub from "pubnub";
import { Chatbox } from "./Chatbox";
import { ChatInput } from "./ChatInput";
import { config } from "@/conf/config";
import { useEffect, useState } from "react";

export default function ChatComponent({ uid, channel, name , messages , pubnub  }: { uid: string; channel: string; name: string , messages : Array<any> , pubnub : Pubnub }){
    

    
    return (
        <div className="h-[90%] z-50 max-w-md w-full absolute bg-[#333333] bottom-2 right-8 rounded-xl p-4 overflow-y-hidden">
            <section className="h-full">
                <h2 className="text-2xl text-white">Messages</h2>
                <Chatbox channel={channel} messages = {messages} />
                <ChatInput name={name} channel={channel} client={pubnub!} />
            </section>
        </div>
    );
}
