"use client";
import { useState, useEffect } from 'react';
import MeetingCard from '@/Component/Home/MeetingCard';
import UpcomingMeeting from '@/Component/Home/UpcomingMeeting';

export default function Home() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);


    return () => clearInterval(interval);
  }, []);

  const timeString = currentTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
  const dateString = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'full',
  }).format(currentTime);

  return (
    <section className="container my-8 flex flex-col gap-6 text-white">
      <div className="h-[300px] w-full rounded-[20px] bg-hero bg-cover p-6 lg:p-0">
        <div className="flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11">
          <h2 className="glassmorphism max-w-[273px] rounded py-2 text-center text-base font-normal">
            Upcoming Meeting at: 12:30 PM
          </h2>
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-extrabold lg:text-7xl">{timeString}</h1>
            <p className="text-lg font-medium text-sky-1 lg:text-2xl">{dateString}</p>
          </div>
        </div>
      </div>
      <section className=" md:flex px-2">
        <MeetingCard />
        <UpcomingMeeting />
      </section>
    </section>
  );
}
