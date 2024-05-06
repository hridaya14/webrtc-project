import Pubnub from "pubnub";
import { Chatbox } from "./Chatbox";
import { ChatInput } from "./ChatInput";
import { config } from "@/conf/config";
import { useEffect, useState } from "react";

export default function ChatComponent({ uid, channel, name , messages , pubnub  }: { uid: string; channel: string; name: string , messages : Array<any> , pubnub : Pubnub }){
    

    
    return (
        <div className="h-[90%] max-sm:h-[90%] z-50 max-w-md w-full absolute bg-[#333333] max-sm:right-0 max-sm:bottom-4 bottom-2 right-8 toggle-box p-6 pb-8 overflow-y-hidden">
            <section className="h-full max-sm:py-4">
                <h2 className="text-2xl text-white p-2">Messages</h2>
                <Chatbox messages = {messages} />
                <ChatInput name={name} channel={channel} client={pubnub!} />
            </section>
        </div>
    );
}
