"use client";
import { account } from "@/appwrite/config";
import { Models } from "appwrite";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { redirect } from "next/navigation";


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
    
    useEffect(() => {
        const channel = generateRandomChannelName();
        setChannel(channel);
        redirect(`/Call/${channel}`);
    }, []);

    
    if (!channel) {
        return <h1>Loading...</h1>;
    }

    return null;
}
