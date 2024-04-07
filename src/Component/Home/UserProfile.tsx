"use client";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Divider,
} from "@nextui-org/react";
import { account } from "@/appwrite/config";
import { useRouter } from "next/navigation";
import useAuth from "@/context/useAuth";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const audioDevices = [ "Microphone 1", "Microphone 2", "Microphone 3", "Microphone 4", "Microphone 5"]
const videoDevices = [ "Camera 1", "Camera 2", "Camera 3", "Camera 4", "Camera 5"]

const UserProfile = ({ avatar, email }: { avatar: string; email: string }) => {
    const router = useRouter();
    const { setAuthStatus } = useAuth();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [settingTab , setSettingTab] = useState<string>("audio")
    const [audioDevice , setAudioDevice] = useState<string>("")
    const [videoDevice , setVideoDevice] = useState<string>("")

    const logout = () => {
        account
        .deleteSession("current")
        .then(() => {
            setAuthStatus(false);
            router.push("/Login");
        })
        .catch((error) => {
            console.error(error);
        });
    };
  return (
    <div className="flex items-center gap-4">
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <img
            src={avatar}
            className="w-10 h-10 rounded-full"
            alt="avatar"
          ></img>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Profile Actions"
          variant="faded"
          className="bg-[#1C1F2E] rounded-xl p-3 backdrop-blur-sm text-white"
        >
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-semibold">Signed in as</p>
            <p className="font-semibold">{email}</p>
          </DropdownItem>
            <DropdownItem key="settings"><Button onPress={onOpen}>Settings</Button></DropdownItem>
          <DropdownItem key="logout" color="danger" onClick={logout}>
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

      <Modal
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        classNames={{
          backdrop:
            " bg-opacity-50 backdrop-blur-sm backdrop-filter backdrop-saturate-150",
        }}
        size="3xl"
      >
        <ModalContent className=" rounded-xl bg-[#1C1F2E] p-4 h-[30rem]">
          {(onClose) => (
            <>
              <ModalBody className="">
                <section className="flex justify-between gap-3 h-full">
                    <ul className="text-white space-y-10  w-1/2">
                      <span className="text-2xl font-bold">Settings</span>
                        <button onClick={() => setSettingTab("audio")} className={cn("flex gap-2 text-xl items-center p-3 w-36",{" bg-blue-600 rounded-full" : settingTab == 'audio'})}><Image src = "/speaker.svg" alt = "Audio" height={20} width={20}></Image>Audio</button>
                        <button onClick={() => setSettingTab("video")} className={cn("flex gap-2 text-xl items-center p-3 w-36",{" bg-blue-600 rounded-full" : settingTab == 'video'})}><Image src = "/camera.svg" alt = "Video" height={20} width={20}></Image>Video</button>
                    </ul>
                    <div className="flex flex-col gap-6 text-white w-1/2">
                        {settingTab === "audio" && (
                            <div className="flex flex-col space-y-10">
                                <span className="text-2xl font-bold">Device Audio Settings</span>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="audioDevice" className="">Select Audio Device</label>
                                    <select name="audioDevice" id="audioDevice" className="p-3 rounded-full text-black ">
                                        {audioDevices.map((device) => (
                                            <option value={device} className="overflow-hidden" key={device} onClick={() => setAudioDevice(device)}>{device}</option>
                                        ))}
                                    </select>  
                                </div>
                            </div>
                        )}
                        {settingTab === "video" && (
                            <div className="flex flex-col space-y-10">
                              <span className="text-2xl font-bold">Device Video Settings</span>
                                <div className="flex flex-col gap-2">
                                <label htmlFor="videoDevice">Select Video Device</label>
                                <select name="videoDevice" id="videoDevice" className="p-3 rounded-full text-black">
                                    {videoDevices.map((device) => (
                                        <option value={device} className="overflow-hidden" key = {device} onClick={() => setVideoDevice(device)}>{device}</option>
                                    ))}
                                </select>
                                </div>
                            </div>
                        )}
                    </div>
                </section>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default UserProfile;
