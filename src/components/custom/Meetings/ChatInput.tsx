
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
      <span className=" bg-white rounded-xl p-2 w-full flex justify-between">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message here"
          className="bg-white"
        />
        <button onClick={sendMessage}>Send</button>
      </span>
    );
  };