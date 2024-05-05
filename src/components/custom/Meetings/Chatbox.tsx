import { useEffect } from "react";
import { pubnub } from "@/app/(root)/(pages)/(Main)/Home/page";
import { useState } from "react";

export const Chatbox = () => {
    const [messages, setMessages] = useState(Array<string>);
    useEffect(() => {
        pubnub.subscribe({ channels: ['chat-channel'] });
        pubnub.addListener({
          message: (event) => {
            setMessages((msgs) => [...msgs, event.message]);
          }
        });
    
        return () => {
          pubnub.unsubscribeAll();
        };
      }, []);
    return (<div></div>)
}