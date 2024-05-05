import { useEffect, useState } from "react";
import Pubnub from "pubnub";

export const Chatbox = ({ channel, messages }: { channel: string;  messages : Array<any> }) => {
  
   

  return (
    <div className="flex flex-col gap-3 h-[90%] overflow-y-scroll">
      {messages.map((msg, index) => (
        <div key={index} className="flex flex-col gap-1">
          <span className="flex gap-2">
            <h2 className="text-black font-semibold">{msg.sender}</h2>
            <p className=" text-gray-500 font-normal">{msg.timestamp}</p>
          </span>
          <span>
            <p>{msg.content}</p>
          </span>
        </div>
      ))}
    </div>
  );
};
