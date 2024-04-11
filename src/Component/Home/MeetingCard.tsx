"use client"
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const MeetingCard = () => {
    const[meetingCode, setMeetingCode] = useState("")
    const router = useRouter();
    return (
        <div className="flex flex-col space-y-12 lg:w-1/2">
            <span className="space-y-6">
                <h1 className=" text-4xl font-bold">Video calls and meetings <br></br> for everyone</h1>
                <h2 className=" text-xl font-thin text-start">IntelliStream provides secure,easy to use video calls <br></br> and meetings for everyone, on any device</h2>
            </span>
            <div className="flex flex-col md:flex-row gap-2 max-sm:items-start items-center">
                <Link href = "/Create-Meeting" className=" flex items-center bg-[#2074EC] p-2 gap-2">
                    <Image src = "/camera.svg" alt="camera" height={24} width={24}></Image>
                    <h3 className=" text-2xl">New Meeting</h3>
                </Link>
                <div className="items-center flex space-x-2">
                    <span className="flex bg-[#1C1F2E] p-2 gap-2 items-center w-72">
                        <Image src = "/keyboard.svg" alt="camera" height={24} width={24}></Image>
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