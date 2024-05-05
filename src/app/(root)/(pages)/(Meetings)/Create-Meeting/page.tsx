"use client";
import { account } from "@/appwrite/config";

import { useEffect, useState } from "react";

import { redirect } from "next/navigation";
import { isAdmin } from "@/atoms/admin";
import { useSetRecoilState } from "recoil";


function generateRandomChannelName() {
    const getRandomChar = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        return characters.charAt(Math.floor(Math.random() * characters.length));
    };
  
    let channelName = '';
    for (let i = 0; i < 12; i++) {
        if (i > 0 && i % 4 === 0) {
            channelName += '-';
        }
        channelName += getRandomChar();
    }
    return channelName;
}

export default function Create() {
    const [channel, setChannel] = useState("");
    const setIsAdmin = useSetRecoilState(isAdmin);
    
    useEffect(() => {
        const channel = generateRandomChannelName();
        setIsAdmin(true);
        setChannel(channel);
        redirect(`/Call/${channel}`);
    }, []);

    
    if (!channel) {
        return <h1>Loading...</h1>;
    }

    return null;
}
