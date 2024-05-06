
import { avatars } from "@/appwrite/config";

import Pubnub from "pubnub";
import { useState } from "react";

export const ChatInput = ({channel , client, name} : {channel : string , client : Pubnub , name : string}) => {
    const [message, setMessage] = useState('');
  
    const sendMessage = () => {
      if (message) {
        client.publish({
          channel: channel,
          message: { sender: name, content: message , timestamp: new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}
        });
        setMessage('');
      }
    };
  
    return (
      <div className=" w-full input-box p-4 flex justify-between relative">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message here"
          className="w-full max-w-[20rem] bg-inherit text-white"
        />
        <button className=" absolute right-4" onClick={sendMessage}><img src = "/ui/submit-button.svg" alt = "send"></img></button>
      </div>
    );
  };