"use client";
import { account } from "@/appwrite/config";
import { Models } from "appwrite";
import { useEffect, useState } from "react";
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
    const [user, setUser] = useState<Models.Preferences>({});
    const [channel, setChannel] = useState("");
    const [token, setToken] = useState("");
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await account.get();
                setUser(userData);

                const channelName = generateRandomChannelName();
                setChannel(channelName);

                const response = await fetch('https://agora-token-server-klgt.onrender.com/getToken', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "tokenType": "rtc",
                        "channel": channelName,
                        "role": "publisher",
                        "uid": userData.$id,
                        "expire": 3600
                    })
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch token');
                }

                const data = await response.json();
                setToken(data.token);

                redirect(`/Call/${channelName}/${data.token}`);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }, []);

    if (!user || !token || !channel) {
        return <h1>Loading...</h1>;
    }

    return null;
}
