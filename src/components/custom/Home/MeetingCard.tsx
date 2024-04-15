"use client"
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const MeetingCard = () => {
    const[meetingCode, setMeetingCode] = useState("")
    const router = useRouter();
    return (
        <div className="flex flex-col items-start space-y-12 xl:w-3/5">
            <span className="space-y-6 w-full">
                <h1 className=" text-4xl font-bold">Video calls and meetings <br></br> for everyone</h1>
                <h2 className=" text-xl font-thin text-start">IntelliStream provides secure,easy to use video calls <br></br> and meetings for everyone, on any device</h2>
            </span>
            <div className="flex max-md:flex-col flex-row justify-center max-sm:space-y-4  xl:flex-row gap-2 items-start">
                <Link href = "/Create-Meeting">
                    <span className="flex items-center bg-[#2074EC] max-h-20 p-2 gap-2">
                        <Image src = "/camera.svg" alt="camera" className="max-h-20" height={24} width={26}></Image>
                        <h3 className=" text-2xl">New Meeting</h3>
                    </span>
                </Link>
                <div className="items-center flex space-x-2">
                    <span className="flex bg-[#1C1F2E] p-2 gap-2 items-center w-72 max-h-20">
                        <Image src = "/keyboard.svg" alt="camera" height={24} width={24} className="max-h-20"></Image>
                        <input className=" text-2xl text-white font-semibold bg-transparent" onChange={(e)=> {setMeetingCode(e.target.value)} } placeholder="Enter a code or link"></input>
                    </span>
                    <span>
                        <button onClick={() => {router.push(`/Call/${meetingCode}`)}}>Join</button>
                    </span>
                </div>
            </div>
        </div>
    );
}
export default MeetingCard;