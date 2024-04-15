"use client";
import Link from "next/link";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Textarea,
} from "@nextui-org/react";

import * as React from "react"

import { Calendar } from "@/components/ui/calendar"
import { account } from "@/appwrite/config";
import { generateRandomChannelName } from "@/app/(root)/(pages)/(Meetings)/Create-Meeting/page";


const Sidebar = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [date, setDate] = React.useState<Date | undefined>()
  const [time , setTime] = React.useState<string>()
  const [title , setTitle] = React.useState<string>()
  const [description , setDescription] = React.useState<string>()
  

  const createMeeting = async () =>{
    if(!date || !time || !title || !description){
      return
    }

    const user = await account.get()
    const uid = user.$id


    const res = await fetch('/api/createMeeting',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        uid: uid,
        title: title,
        description: description,
        date: date,
        time: time,
        meetingCode: generateRandomChannelName(),
      })
    })
    const data = await res.json()
  }
  
  return (
    <aside className=" sticky left-0 top-0 w-64 bg-[#1C1F2E] h-screen max-lg:hidden pt-24">
      <ul className="text-white flex flex-col gap-12 items-start py-4 px-4 text-lg">
        <Link
          href="/Home"
          className="p-2 flex items-center justify-center gap-4 "
        >
          <img src="/home.svg"></img>
          <span>
            <h2>Home</h2>
          </span>
        </Link>
        <Link
          href="/Upcoming"
          className="p-2 flex items-center justify-center gap-4 "
        >
          <img src="/upcoming.png"></img>
          <span>
            <h2>Upcoming</h2>
          </span>
        </Link>
        <Button
          onPress={onOpen}
          className="p-2 flex items-center justify-center gap-4 "
        >
          <img src="/plus.png"></img>
          <span>
            <h2>Schedule Meeting</h2>
          </span>
        </Button>
        <Modal
          backdrop="blur"
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          placement="center"
          size="sm"
          classNames={{
            backdrop:
              "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
          }}
        >
          <ModalContent className="bg-[#1C1F2E] rounded-xl p-3">
            {(onClose) => (
              <>
                <ModalHeader>
                  <h2 className="text-3xl text-white">Create Meeting</h2>
                </ModalHeader>
                <ModalBody>
                  <span>
                    <h3 className="text-xl font-semibold text-white">Add Title</h3>
                    <input type="text" placeholder="Meeting Name" onChange={(e) => setTitle(e.target.value)} className="bg-[#252A41] p-2 w-full rounded-lg text-white"></input>
                  </span>
                  <span>
                    <h3 className="text-xl text-white font-semibold">Add Description</h3>
                    <Textarea
                        maxRows={3}
                        placeholder="Enter meeting description"
                        onChange={(e) => setDescription(e.target.value)}
                        className=" text-white bg-[#252A41] p-2 w-full rounded-lg"
                        isRequired
                    />
                  </span>
                  <span className="flex flex-col">
                    <h3 className="text-xl text-white font-semibold">Select Date</h3>
                    <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-lg bg-[#252A41] text-white"
                    />
                  </span>
                  <span>
                    <h3 className="text-xl text-white font-semibold">Select Time</h3>
                    <input type = "text" placeholder="Enter Time(hh:mm)" onChange={(e) => setTime(e.target.value)} className="bg-[#252A41] p-2 w-full rounded-lg text-white"></input>
                  </span>
                </ModalBody>
                <ModalFooter>
                  <Button className="bg-[#0E78F9] w-full rounded-lg p-2" variant="light" onClick = {createMeeting} onPress={onClose} >
                    Create Meeting
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>

        <Link
          href="/Create"
          className="p-2 flex items-center justify-center gap-4 "
        >
          <img src="/plus.png"></img>
          <span>
            <h2>Personal Room</h2>
          </span>
        </Link>
      </ul>
    </aside>
  );
};

export default Sidebar;
