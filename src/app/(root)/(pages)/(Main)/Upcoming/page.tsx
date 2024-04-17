"use client"
import { account } from "@/appwrite/config"
import { UpcomingCard } from "@/components/custom/Home/UpcomingCard"
import { Loading } from "@/components/custom/Loading"
import { meeting, meetings } from "@/types"
import { useEffect, useState } from "react"



export default function Upcoming(){
    const [meetings , setMeetings] = useState<meetings>([])
    const [loading , setLoading] = useState(true);
    useEffect( () => {
        const fetchMeetings = async () => {
            const { $id } = await account.get();
            const response = await fetch(`/api/getMeeting?uid=${$id}&limit=9`)
            const data = await response.json();
            setMeetings(data.meetings)
            setLoading(false)
        }
        setLoading(true)
        fetchMeetings()
        
    },[])

    if(loading){

        return <Loading/>
    }

    if(meetings?.length === 0){
        <div className="size-full">
            <h1 className="my-auto text-center text-white">No Upcoming Meetings</h1>
        </div>
    }


    return (
       <div className="size-full grid grid-cols-3 gap-9 px-4">
            {meetings?.map((meeting : meeting)=> {
                return <UpcomingCard key = {meeting.meetingCode} title = {meeting.title} description = {meeting.description} time = {meeting.time} date = {meeting.date} meetingCode = {meeting.meetingCode} />
            })}
       </div> 
    )
}