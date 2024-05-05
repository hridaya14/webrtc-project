import { Chatbox } from "./Chatbox"
import { ChatInput } from "./ChatInput"



export default function ChatComponent({uid,channel} : {uid : string , channel : string}){
    

    
    return (
        <div className="h-[90%] z-50 max-w-md w-full absolute bg-[#333333] bottom-2 right-8 rounded-xl p-3 overflow-y-scroll">
            <section>
                <h2 className="text-2xl text-white">Messages</h2>
                <Chatbox/>
                <ChatInput/>
            </section>
        </div>
    )
}