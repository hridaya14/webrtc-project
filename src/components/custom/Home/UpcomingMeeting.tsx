"use client"
import { UpcomingCard } from "@/components/custom/Home/UpcomingCard";
import { useEffect, useState } from "react";
import { meeting, meetings } from "@/types";
import { Skeleton } from "@/components/ui/skeleton"


export const UpcomingMeeting =  ({uid} : {uid : string}) => {
  const [meetings, setMeetings] = useState<meetings>([])
  const [loading , setLoading] = useState(true)

  useEffect( ()=> {
    const fetchMeetings = async () => {
      const response = await fetch(`/api/getMeeting?uid=${uid}&limit=2`)
      const data = await response.json();
      console.log(data.meetings)
      setMeetings(data.meetings)
      setLoading(false)
    }
    setLoading(true)
    fetchMeetings()
  },[])

  if(loading){
    return (
      <div className="w-full xl:w-2/5 lg:px-2">
        <span className="flex justify-between items-center gap-2 ">
          <h2 className="text-2xl font-bold">Today&apos;s Upcoming Meetings</h2>
          <a className="text-md font-normal" href="/Upcoming">See More</a>
        </span>
        <div className="flex flex-col gap-4 mt-4">
          <Skeleton className=" h-48 rounded-xl bg-[#1C1F2E] p-4" />
          <Skeleton className="h-48 rounded-xl bg-[#1C1F2E] p-4" />
        </div>
      </div>
    )
  }
  return (
    <div className="w-full xl:w-2/5 lg:px-2">
      <span className="flex justify-between items-center gap-2 ">
        <h2 className="text-2xl font-bold">Today&apos;s Upcoming Meetings</h2>
        <a className="text-md font-normal" href="/Upcoming">See More</a>
      </span>
      <div className="flex flex-col gap-4 mt-4">
      {
        meetings?.length===0 ? <p className="text-2xl text-white my-auto">No Upcoming Meetings</p> : meetings?.map((meeting: meeting) => {
          return <UpcomingCard key={meeting.title} title = {meeting.title} description = {meeting.description} time = {meeting.time} date = {meeting.date} meetingCode = {meeting.meetingCode} />
        })
      }
    </div>
  </div>
  );
};


