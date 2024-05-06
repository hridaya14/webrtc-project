import { useEffect, useState } from "react";
import Pubnub from "pubnub";

export const Chatbox = ({ messages }: { messages : Array<any> }) => {
  
   if (messages.length === 0){
    return (
      <div className="h-[85%] flex flex-col justify-center items-center">
        <img src = "/ui/empty.svg" className=""></img>
      </div>
    )
   }

  return (
    <div className="flex flex-col gap-3 p-2 items-start h-[85%] overflow-y-scroll">
      {messages.map((msg, index) => (
        <div key={index} className="flex flex-col items gap-1 p-1 rounded-3xl max-w-fit">
          <span className="flex gap-2 items-center">
            <h2 className=" text-white font-normal">{msg.sender}</h2>
            <p className=" text-white font-light text-sm">{msg.timestamp}</p>
          </span>
          <span>
            <p className="text-gray-400">{msg.content}</p>
          </span>
        </div>
      ))}
    </div>
  );
};
